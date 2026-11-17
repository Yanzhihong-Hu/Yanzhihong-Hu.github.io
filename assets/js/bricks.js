/* Round-brick toys for the homepage: landmark pins, a physics brick box, and a dot build plate.
   Everything here is progressive enhancement; the page reads the same without it. */
(function () {
  'use strict';

  var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  function reducedMotion() { return reducedMotionQuery.matches; }

  /* ---------- Shared pixel sprite helpers ---------- */
  var OUTLINE = '#1a242a';
  var PALETTE = {
    gold: '#e8be69',
    sage: '#a2bd7e',
    brick: '#b4654c',
    sky: '#7f9fbe',
    cream: '#f2eddc',
    stone: '#8a958c'
  };

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  /* amount > 0 mixes toward white, < 0 toward the outline colour. */
  function shade(rgb, amount) {
    var target = amount > 0 ? [255, 250, 236] : [26, 36, 42];
    var t = Math.abs(amount);
    return [0, 1, 2].map(function (i) { return Math.round(rgb[i] + (target[i] - rgb[i]) * t); });
  }

  /* Draws a round 1x1 brick seen from above: outlined disk, shaded rim, stud with highlight. */
  var spriteCache = {};
  function brickSprite(radius, hex, ring, flat) {
    var key = radius + hex + (ring || '') + (flat ? 'f' : '');
    if (spriteCache[key]) return spriteCache[key];

    var size = radius * 2 + 6;
    var center = size / 2 - 0.5;
    var canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    var image = ctx.createImageData(size, size);
    var base = hexToRgb(hex);
    var light = shade(base, 0.32);
    var lighter = shade(base, 0.62);
    var dark = shade(base, -0.28);
    var darker = shade(base, -0.5);
    var outline = hexToRgb(ring || OUTLINE);
    var shadow = hexToRgb(OUTLINE);
    var stud = Math.max(1.6, radius * 0.56);
    var studY = -radius * 0.1;

    for (var y = 0; y < size; y += 1) {
      for (var x = 0; x < size; x += 1) {
        var dx = x - center;
        var dy = y - center;
        var d = Math.sqrt(dx * dx + dy * dy);
        var color = null;
        var alpha = 255;

        if (d <= radius) {
          color = base;
          if (d > radius - 1.5 && dx + dy > radius * 0.35) color = dark;
          else if (d > radius - 1.5 && dx + dy < -radius * 0.5) color = light;

          var sx = dx;
          var sy = dy - studY;
          var sd = Math.sqrt(sx * sx + sy * sy);
          if (flat) {
            /* Printed round tile: no stud, just a glossy arc along the upper-left edge. */
            if (d > radius - 3.5 && d < radius - 2 && dx < -radius * 0.2 && dy < -radius * 0.2) color = lighter;
          } else if (sd <= stud) {
            color = sd > stud - 1.1 ? (sx + sy > 0 ? darker : dark) : light;
            if (sd < stud * 0.72 && sd > stud * 0.25 && sx < -stud * 0.18 && sy < -stud * 0.18) color = lighter;
          } else if (sd <= stud + 1.2 && sx + sy > stud * 0.4) {
            color = dark;
          }
        } else if (d <= radius + 1) {
          color = outline;
        } else if (ring && d <= radius + 2) {
          color = outline;
        } else {
          var hx = dx - 1;
          var hy = dy - 2;
          if (Math.sqrt(hx * hx + hy * hy) <= radius + 1) { color = shadow; alpha = 120; }
        }

        if (color) {
          var i = (y * size + x) * 4;
          image.data[i] = color[0];
          image.data[i + 1] = color[1];
          image.data[i + 2] = color[2];
          image.data[i + 3] = alpha;
        }
      }
    }
    ctx.putImageData(image, 0, 0);
    spriteCache[key] = { canvas: canvas, center: Math.floor(size / 2) };
    return spriteCache[key];
  }

  /* ---------- Landmark pins on the campus scene ---------- */
  function initScenePins() {
    var map = document.querySelector('[data-scene-map]');
    var toggles = document.querySelectorAll('[data-pin-target]');
    if (!map || !toggles.length) return;

    function setPin(name, on) {
      var pin = map.querySelector('[data-pin="' + name + '"]');
      var toggle = document.querySelector('[data-pin-target="' + name + '"]');
      if (!pin || !toggle) return;
      pin.classList.remove('is-dropping');
      if (on) {
        void pin.offsetWidth; // restart the drop animation
        pin.classList.add('is-dropping');
      }
      pin.classList.toggle('is-on', on);
      toggle.setAttribute('aria-pressed', String(on));
    }

    toggles.forEach(function (toggle) {
      var name = toggle.getAttribute('data-pin-target');
      var pin = map.querySelector('[data-pin="' + name + '"]');
      toggle.addEventListener('click', function () {
        setPin(name, toggle.getAttribute('aria-pressed') !== 'true');
      });
      toggle.addEventListener('mouseenter', function () { if (pin) pin.classList.add('is-peek'); });
      toggle.addEventListener('mouseleave', function () { if (pin) pin.classList.remove('is-peek'); });
      if (pin) {
        pin.addEventListener('click', function () { setPin(name, false); });
      }
    });

    /* Tapping the picture near a landmark pins it too. */
    map.addEventListener('click', function (event) {
      if (event.target.closest('.map-pin')) return;
      var rect = map.getBoundingClientRect();
      var px = (event.clientX - rect.left) / rect.width;
      var py = (event.clientY - rect.top) / rect.height;
      var best = null;
      var bestDistance = 0.16;
      map.querySelectorAll('[data-pin]').forEach(function (pin) {
        var x = parseFloat(pin.style.getPropertyValue('--x')) / 100;
        var y = parseFloat(pin.style.getPropertyValue('--y')) / 100;
        var distance = Math.sqrt((x - px) * (x - px) + (y - py) * (y - py));
        if (distance < bestDistance) { best = pin; bestDistance = distance; }
      });
      if (best) setPin(best.getAttribute('data-pin'), true);
    });
  }

  /* ---------- Physics brick box ---------- */
  function initStudTray(root) {
    var stage = root.querySelector('[data-stud-stage]');
    var canvas = stage.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var labelLayer = root.querySelector('[data-stud-labels]');
    var readout = root.querySelector('[data-stud-readout]');
    var keys = Array.prototype.slice.call(root.querySelectorAll('[data-stud-key]'));
    var defaultReadout = readout.textContent;

    var SCALE = 3; // CSS pixels per sprite pixel
    var GRAVITY = 2300;
    var RESTITUTION = 0.32;
    var interestColors = ['gold', 'sage', 'brick', 'sky'];
    var smallColors = ['gold', 'sage', 'brick', 'sky', 'cream', 'stone', 'sage', 'gold'];
    var MAX_BALLS = 72;

    var width = 0;
    var height = 0;
    var balls = [];
    var running = false;
    var visible = true;
    var started = false;
    var lastTime = 0;
    var quietFrames = 0;
    var grabbed = null;
    var pointer = { x: 0, y: 0, startX: 0, startY: 0, startTime: 0, id: null, onBall: false };
    var selected = -1;

    function interestRadius() { return width < 640 ? 16 : 22; }

    function makeBall(options) {
      var radius = options.radius;
      var ball = {
        x: options.x,
        y: options.y,
        vx: options.vx || 0,
        vy: options.vy || 0,
        r: radius * SCALE,
        spriteRadius: radius,
        color: options.color,
        interest: options.interest,
        entering: options.y < radius * SCALE,
        flat: options.interest !== undefined,
        label: null
      };
      if (ball.interest !== undefined) {
        var label = document.createElement('span');
        label.className = 'stud-label';
        label.textContent = keys[ball.interest].getAttribute('data-title');
        labelLayer.appendChild(label);
        ball.label = label;
      }
      balls.push(ball);
      return ball;
    }

    function populate(dropIn) {
      balls.forEach(function (ball) { if (ball.label) ball.label.remove(); });
      balls = [];
      selected = -1;
      var big = interestRadius();
      keys.forEach(function (key, index) {
        var slot = (index + 0.5) / keys.length;
        makeBall({
          radius: big,
          color: PALETTE[interestColors[index % interestColors.length]],
          interest: index,
          x: width * (0.12 + slot * 0.76) + (Math.random() - 0.5) * 30,
          y: dropIn ? -big * SCALE * (1.5 + index * 1.4) : height - big * SCALE - 2
        });
      });
      var count = Math.round(Math.min(40, Math.max(12, width / 34)));
      for (var i = 0; i < count; i += 1) {
        var radius = 4 + Math.floor(Math.random() * 5);
        makeBall({
          radius: radius,
          color: PALETTE[smallColors[i % smallColors.length]],
          x: radius * SCALE + Math.random() * (width - radius * SCALE * 2),
          y: dropIn ? -Math.random() * height * 1.4 - 20 : height * 0.3 + Math.random() * height * 0.6,
          vx: (Math.random() - 0.5) * 120
        });
      }
      if (!dropIn) settle();
      updateKeys();
    }

    /* Runs the simulation without drawing so bricks start at rest (reduced motion, first paint). */
    function settle() {
      for (var i = 0; i < 360; i += 1) step(1 / 60);
      balls.forEach(function (ball) { ball.vx = 0; ball.vy = 0; });
    }

    function resize() {
      var rect = stage.getBoundingClientRect();
      var newWidth = Math.max(1, Math.round(rect.width));
      var newHeight = Math.max(1, Math.round(rect.height));
      var ratioX = width ? newWidth / width : 1;
      width = newWidth;
      height = newHeight;
      canvas.width = Math.ceil(width / SCALE);
      canvas.height = Math.ceil(height / SCALE);
      ctx.imageSmoothingEnabled = false;
      balls.forEach(function (ball) {
        ball.x = Math.min(Math.max(ball.x * ratioX, ball.r), width - ball.r);
        if (!ball.entering) ball.y = Math.min(ball.y, height - ball.r);
      });
      draw();
      wake();
    }

    function step(dt) {
      var substeps = 4;
      var h = dt / substeps;
      for (var s = 0; s < substeps; s += 1) {
        for (var i = 0; i < balls.length; i += 1) {
          var b = balls[i];
          if (b === grabbed) {
            b.vx = (pointer.x - b.x) * 22;
            b.vy = (pointer.y - b.y) * 22;
            var speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
            if (speed > 2600) { b.vx *= 2600 / speed; b.vy *= 2600 / speed; }
          } else {
            b.vy += GRAVITY * h;
            b.vx *= 0.9995;
          }
          b.x += b.vx * h;
          b.y += b.vy * h;

          if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx) * RESTITUTION; }
          if (b.x + b.r > width) { b.x = width - b.r; b.vx = -Math.abs(b.vx) * RESTITUTION; }
          if (b.y + b.r > height) {
            b.y = height - b.r;
            b.vy = -Math.abs(b.vy) * RESTITUTION;
            if (Math.abs(b.vy) < 40) b.vy = 0;
            b.vx *= 0.96;
          }
          if (b.entering) {
            if (b.y - b.r >= 0) b.entering = false;
          } else if (b.y - b.r < 0) {
            b.y = b.r;
            b.vy = Math.abs(b.vy) * RESTITUTION;
          }
        }

        for (var a = 0; a < balls.length; a += 1) {
          var p = balls[a];
          for (var c = a + 1; c < balls.length; c += 1) {
            var q = balls[c];
            var dx = q.x - p.x;
            var dy = q.y - p.y;
            var minDistance = p.r + q.r;
            var distanceSq = dx * dx + dy * dy;
            if (distanceSq >= minDistance * minDistance || distanceSq === 0) continue;
            var distance = Math.sqrt(distanceSq);
            var nx = dx / distance;
            var ny = dy / distance;
            var invP = p === grabbed ? 0 : 1 / (p.r * p.r);
            var invQ = q === grabbed ? 0 : 1 / (q.r * q.r);
            var invSum = invP + invQ;
            if (invSum === 0) continue;
            var overlap = (minDistance - distance) * 0.9;
            p.x -= nx * overlap * invP / invSum;
            p.y -= ny * overlap * invP / invSum;
            q.x += nx * overlap * invQ / invSum;
            q.y += ny * overlap * invQ / invSum;

            var relative = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
            if (relative < 0) {
              var impulse = -(1 + RESTITUTION) * relative / invSum;
              p.vx -= impulse * invP * nx;
              p.vy -= impulse * invP * ny;
              q.vx += impulse * invQ * nx;
              q.vy += impulse * invQ * ny;
              /* A little rolling friction so piles come to rest. */
              var tx = -ny;
              var ty = nx;
              var tangent = (q.vx - p.vx) * tx + (q.vy - p.vy) * ty;
              var friction = tangent * 0.08 / invSum;
              p.vx += friction * invP * tx;
              p.vy += friction * invP * ty;
              q.vx -= friction * invQ * tx;
              q.vy -= friction * invQ * ty;
            }
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < balls.length; i += 1) {
        var b = balls[i];
        var isSelected = b.interest !== undefined && b.interest === selected;
        var sprite = brickSprite(b.spriteRadius, b.color, isSelected ? '#f4d894' : null, b.flat);
        var sx = Math.round(b.x / SCALE);
        var sy = Math.round(b.y / SCALE);
        ctx.drawImage(sprite.canvas, sx - sprite.center, sy - sprite.center);
        if (b.label) {
          var lx = sx * SCALE;
          var ly = sy * SCALE;
          b.label.style.transform = 'translate(' + lx + 'px,' + ly + 'px) translate(-50%, -50%)';
          b.label.style.width = Math.round(b.r * 1.6) + 'px';
          b.label.classList.toggle('is-selected', isSelected);
        }
      }
    }

    function frame(time) {
      if (!running) return;
      var dt = Math.min(0.033, (time - lastTime) / 1000 || 0.016);
      lastTime = time;
      step(dt);
      draw();

      var energy = 0;
      balls.forEach(function (b) { energy = Math.max(energy, Math.abs(b.vx) + Math.abs(b.vy)); });
      quietFrames = energy < 14 && !grabbed ? quietFrames + 1 : 0;
      if (quietFrames > 45 || !visible) {
        running = false;
        return;
      }
      window.requestAnimationFrame(frame);
    }

    function wake() {
      quietFrames = 0;
      if (running || !visible || !started) return;
      running = true;
      lastTime = performance.now();
      window.requestAnimationFrame(frame);
    }

    function localPoint(event) {
      var rect = stage.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function ballAt(point) {
      for (var i = balls.length - 1; i >= 0; i -= 1) {
        var b = balls[i];
        var dx = point.x - b.x;
        var dy = point.y - b.y;
        if (dx * dx + dy * dy <= (b.r + 4) * (b.r + 4)) return b;
      }
      return null;
    }

    function updateKeys() {
      keys.forEach(function (key, index) { key.setAttribute('aria-pressed', String(index === selected)); });
    }

    function selectInterest(index) {
      selected = index;
      var key = keys[index];
      readout.innerHTML = '';
      var title = document.createElement('strong');
      title.textContent = key.getAttribute('data-title');
      var note = document.createElement('span');
      note.className = 'stud-tray__note';
      note.textContent = key.getAttribute('data-note');
      readout.appendChild(title);
      readout.appendChild(document.createTextNode(' '));
      readout.appendChild(note);
      readout.appendChild(document.createTextNode(' ' + key.getAttribute('data-description')));
      updateKeys();
    }

    function hop(ball, strength) {
      ball.vy = -(strength || 760) - Math.random() * 200;
      ball.vx += (Math.random() - 0.5) * 260;
    }

    stage.addEventListener('pointerdown', function (event) {
      if (event.button !== undefined && event.button !== 0) return;
      var point = localPoint(event);
      pointer.x = point.x;
      pointer.y = point.y;
      pointer.startX = point.x;
      pointer.startY = point.y;
      pointer.startTime = performance.now();
      pointer.id = event.pointerId;
      var hit = ballAt(point);
      pointer.onBall = !!hit;
      if (hit) {
        grabbed = hit;
        balls.splice(balls.indexOf(hit), 1);
        balls.push(hit); // draw the grabbed brick on top
        stage.classList.add('is-grabbing');
      }
      try { stage.setPointerCapture(event.pointerId); } catch (error) { /* older browsers */ }
      event.preventDefault();
      wake();
    });

    stage.addEventListener('pointermove', function (event) {
      var point = localPoint(event);
      if (event.pointerId === pointer.id) {
        pointer.x = point.x;
        pointer.y = point.y;
      } else if (event.pointerType === 'mouse') {
        stage.classList.toggle('is-over-brick', !!ballAt(point));
      }
    });

    function release(event, cancelled) {
      if (event.pointerId !== pointer.id) return;
      var moved = Math.abs(pointer.x - pointer.startX) + Math.abs(pointer.y - pointer.startY);
      var quick = performance.now() - pointer.startTime < 350;
      var tapped = !cancelled && moved < 8 && quick;
      var held = grabbed;
      grabbed = null;
      pointer.id = null;
      stage.classList.remove('is-grabbing');

      if (tapped && held) {
        hop(held);
        if (held.interest !== undefined) selectInterest(held.interest);
      } else if (tapped && !pointer.onBall && balls.length < MAX_BALLS) {
        var radius = 4 + Math.floor(Math.random() * 4);
        makeBall({
          radius: radius,
          color: PALETTE[smallColors[Math.floor(Math.random() * smallColors.length)]],
          x: Math.min(Math.max(pointer.x, radius * SCALE), width - radius * SCALE),
          y: Math.max(pointer.y, radius * SCALE),
          vy: -120
        });
      }
      wake();
    }
    stage.addEventListener('pointerup', function (event) { release(event, false); });
    stage.addEventListener('pointercancel', function (event) { release(event, true); });
    stage.addEventListener('pointerleave', function () { stage.classList.remove('is-over-brick'); });

    keys.forEach(function (key, index) {
      key.addEventListener('click', function () {
        var ball = balls.filter(function (b) { return b.interest === index; })[0];
        if (ball) hop(ball, 900);
        selectInterest(index);
        wake();
      });
    });

    root.querySelector('[data-stud-shake]').addEventListener('click', function () {
      balls.forEach(function (ball) {
        ball.entering = false;
        ball.vy = -(500 + Math.random() * 700);
        ball.vx = (Math.random() - 0.5) * 900;
      });
      wake();
    });

    root.querySelector('[data-stud-reset]').addEventListener('click', function () {
      populate(!reducedMotion());
      readout.textContent = defaultReadout;
      draw();
      wake();
    });

    root.hidden = false;
    resize();

    if ('ResizeObserver' in window) {
      new ResizeObserver(function () { resize(); }).observe(stage);
    } else {
      window.addEventListener('resize', resize);
    }

    function start() {
      if (started) return;
      started = true;
      populate(!reducedMotion());
      draw();
      wake();
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          visible = entry.isIntersecting;
          if (visible) {
            if (!started && entry.intersectionRatio >= 0.35) start();
            wake();
          }
        });
      }, { threshold: [0, 0.35] }).observe(stage);
    } else {
      start();
    }
  }

  /* ---------- Round-tile build plate ---------- */
  function initBuildPlate(root) {
    var canvas = root.querySelector('[data-plate-canvas]');
    var ctx = canvas.getContext('2d');
    var board = root.querySelector('.build-plate__board');
    var status = root.querySelector('[data-plate-status]');
    var swatches = Array.prototype.slice.call(root.querySelectorAll('[data-swatch]'));
    var COLS = 16;
    var ROWS = 10;
    var CELL = 8; // sprite pixels per cell
    var STORAGE_KEY = 'yh-build-plate-v1';
    var colors = { gold: PALETTE.gold, sage: PALETTE.sage, brick: PALETTE.brick, sky: PALETTE.sky, cream: PALETTE.cream };
    var current = 'gold';
    var cells = [];
    var cursor = { col: 2, row: 1 };
    var focused = false;
    var pops = {};
    var animating = false;
    var painting = null;

    /* "YH." in gold tiles. */
    var PATTERN = [
      '................',
      '..g...g.b...b...',
      '..g...g.b...b...',
      '...g.g..b...b...',
      '....g...bbbbb...',
      '....g...b...b...',
      '....g...b...b...',
      '....g...b...b.s.',
      '................',
      '................'
    ];
    var PATTERN_COLORS = { g: 'gold', b: 'gold', s: 'sage' };

    function loadPattern() {
      cells = PATTERN.map(function (row) {
        return row.split('').map(function (ch) { return PATTERN_COLORS[ch] || null; });
      });
    }

    function save() {
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cells)); } catch (error) { /* storage unavailable */ }
    }

    function restore() {
      try {
        var stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
        if (Array.isArray(stored) && stored.length === ROWS && stored.every(function (row) { return Array.isArray(row) && row.length === COLS; })) {
          cells = stored.map(function (row) { return row.map(function (value) { return colors[value] ? value : null; }); });
          return true;
        }
      } catch (error) { /* storage unavailable or malformed */ }
      return false;
    }

    /* Baseplate cell with its stud, and a smooth round tile in a given colour. */
    var cellSprites = {};
    function cellSprite(kind, scale) {
      var key = kind + scale;
      if (cellSprites[key]) return cellSprites[key];
      var c = document.createElement('canvas');
      c.width = CELL;
      c.height = CELL;
      var g = c.getContext('2d');
      var image = g.createImageData(CELL, CELL);
      var plate = hexToRgb('#3c4a46');
      var plateLight = shade(plate, 0.14);
      var plateDark = shade(plate, -0.35);
      var tile = kind === 'plate' ? null : hexToRgb(colors[kind]);
      var radius = kind === 'plate' ? 0 : (scale === 'pop' ? 2.6 : 3.6);
      for (var y = 0; y < CELL; y += 1) {
        for (var x = 0; x < CELL; x += 1) {
          var dx = x + 0.5 - CELL / 2;
          var dy = y + 0.5 - CELL / 2;
          var d = Math.sqrt(dx * dx + dy * dy);
          var color = plate;
          if (d < 2.2) color = (dx + dy < -0.6) ? plateLight : plate;
          else if (d < 3 && dx + dy > 0.8) color = plateDark;
          if (tile && d <= radius) {
            color = tile;
            if (d > radius - 1 && dx + dy > 1) color = shade(tile, -0.3);
            if (dx < -0.4 && dy < -0.4 && d < radius - 1 && d > radius * 0.3) color = shade(tile, 0.45);
          } else if (tile && d <= radius + 0.9 && dx + dy > 0) {
            color = plateDark;
          }
          var i = (y * CELL + x) * 4;
          image.data[i] = color[0];
          image.data[i + 1] = color[1];
          image.data[i + 2] = color[2];
          image.data[i + 3] = 255;
        }
      }
      g.putImageData(image, 0, 0);
      cellSprites[key] = c;
      return c;
    }

    var scale = 3;
    function resize() {
      var available = board.clientWidth;
      scale = Math.max(2, Math.min(4, Math.floor(available / (COLS * CELL))));
      canvas.width = COLS * CELL;
      canvas.height = ROWS * CELL;
      canvas.style.width = COLS * CELL * scale + 'px';
      canvas.style.height = ROWS * CELL * scale + 'px';
      draw(performance.now());
    }

    function draw(now) {
      ctx.imageSmoothingEnabled = false;
      var stillPopping = false;
      for (var row = 0; row < ROWS; row += 1) {
        for (var col = 0; col < COLS; col += 1) {
          var value = cells[row][col];
          var popStart = pops[row + ',' + col];
          var small = popStart && now - popStart < 90;
          if (popStart && !small) delete pops[row + ',' + col];
          if (small) stillPopping = true;
          ctx.drawImage(cellSprite(value || 'plate', small ? 'pop' : 'full'), col * CELL, row * CELL);
        }
      }
      if (focused) {
        ctx.strokeStyle = '#f4d894';
        ctx.lineWidth = 1;
        ctx.strokeRect(cursor.col * CELL + 0.5, cursor.row * CELL + 0.5, CELL - 1, CELL - 1);
      }
      return stillPopping;
    }

    function animate(now) {
      if (draw(now)) { window.requestAnimationFrame(animate); } else { animating = false; }
    }

    function setCell(row, col, value) {
      if (row < 0 || col < 0 || row >= ROWS || col >= COLS) return;
      if (cells[row][col] === value) return;
      cells[row][col] = value;
      if (value && !reducedMotion()) {
        pops[row + ',' + col] = performance.now();
        if (!animating) { animating = true; window.requestAnimationFrame(animate); }
      } else {
        draw(performance.now());
      }
    }

    function cellFromEvent(event) {
      var rect = canvas.getBoundingClientRect();
      return {
        col: Math.floor((event.clientX - rect.left) / rect.width * COLS),
        row: Math.floor((event.clientY - rect.top) / rect.height * ROWS)
      };
    }

    function chooseSwatch(name) {
      current = name;
      swatches.forEach(function (swatch) {
        swatch.setAttribute('aria-pressed', String(swatch.getAttribute('data-swatch') === name));
      });
    }

    function describe(row, col) {
      var value = cells[row][col];
      status.textContent = 'Row ' + (row + 1) + ', column ' + (col + 1) + ': ' + (value ? value + ' tile' : 'empty');
    }

    canvas.addEventListener('pointerdown', function (event) {
      if (event.button !== undefined && event.button !== 0) return;
      var cell = cellFromEvent(event);
      if (cell.row < 0 || cell.row >= ROWS || cell.col < 0 || cell.col >= COLS) return;
      var value = current === 'erase' ? null : current;
      /* Tapping a tile of the chosen colour removes it, like pulling a brick off. */
      painting = cells[cell.row][cell.col] === value ? null : value;
      painting = { value: painting };
      setCell(cell.row, cell.col, painting.value);
      cursor = cell;
      try { canvas.setPointerCapture(event.pointerId); } catch (error) { /* older browsers */ }
      event.preventDefault();
    });
    canvas.addEventListener('pointermove', function (event) {
      if (!painting) return;
      var cell = cellFromEvent(event);
      /* Fill every cell between pointer samples so fast strokes stay continuous. */
      var steps = Math.max(Math.abs(cell.row - cursor.row), Math.abs(cell.col - cursor.col));
      for (var i = 1; i <= steps; i += 1) {
        setCell(Math.round(cursor.row + (cell.row - cursor.row) * i / steps), Math.round(cursor.col + (cell.col - cursor.col) * i / steps), painting.value);
      }
      cursor = {
        row: Math.min(ROWS - 1, Math.max(0, cell.row)),
        col: Math.min(COLS - 1, Math.max(0, cell.col))
      };
    });
    function endPaint() {
      if (!painting) return;
      painting = null;
      save();
    }
    canvas.addEventListener('pointerup', endPaint);
    canvas.addEventListener('pointercancel', endPaint);

    canvas.addEventListener('focus', function () { focused = true; describe(cursor.row, cursor.col); draw(performance.now()); });
    canvas.addEventListener('blur', function () { focused = false; draw(performance.now()); });
    canvas.addEventListener('keydown', function (event) {
      var moves = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] };
      if (moves[event.key]) {
        cursor.row = Math.min(ROWS - 1, Math.max(0, cursor.row + moves[event.key][0]));
        cursor.col = Math.min(COLS - 1, Math.max(0, cursor.col + moves[event.key][1]));
        describe(cursor.row, cursor.col);
        draw(performance.now());
        event.preventDefault();
      } else if (event.key === ' ' || event.key === 'Enter') {
        var value = current === 'erase' ? null : current;
        setCell(cursor.row, cursor.col, cells[cursor.row][cursor.col] === value ? null : value);
        save();
        describe(cursor.row, cursor.col);
        event.preventDefault();
      }
    });

    swatches.forEach(function (swatch) {
      swatch.addEventListener('click', function () { chooseSwatch(swatch.getAttribute('data-swatch')); });
    });
    root.querySelector('[data-plate-clear]').addEventListener('click', function () {
      cells = cells.map(function (row) { return row.map(function () { return null; }); });
      save();
      status.textContent = 'Plate cleared.';
      draw(performance.now());
    });
    root.querySelector('[data-plate-reset]').addEventListener('click', function () {
      loadPattern();
      save();
      status.textContent = 'Back to the original build.';
      draw(performance.now());
    });

    if (!restore()) loadPattern();
    root.hidden = false;
    resize();
    if ('ResizeObserver' in window) {
      new ResizeObserver(resize).observe(board);
    } else {
      window.addEventListener('resize', resize);
    }
  }

  initScenePins();
  var tray = document.querySelector('[data-stud-tray]');
  if (tray && tray.querySelector('canvas').getContext) initStudTray(tray);
  var plate = document.querySelector('[data-build-plate]');
  if (plate && plate.querySelector('canvas').getContext) initBuildPlate(plate);
}());
