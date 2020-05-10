var config = {
    bgColor: "#000",
    count: 500,
    colors: [
        "#ffaa33",
        "#234785",
        "#00aaff",
        "#29ffcc",
        "#463ff5",
    ],
    maxR: 30,
};

(function (config) {

    var winSize = {};
    winSize.width = window.innerWidth;
    winSize.height = window.innerHeight;

    // 初始化并插入canvas
    var canvas = document.createElement("canvas");
    canvas.width = winSize.width;
    canvas.height = winSize.height;
    canvas.style.backgroundColor = config.bgColor;
    document.body.appendChild(canvas);

    // 监听窗口大小变化
    window.addEventListener("resize", () => {
        canvas.width = winSize.width = window.innerWidth;
        canvas.height = winSize.height = window.innerHeight;
    });

    var mouse = { x: 0, y: 0 };
    var moveLock = false;
    window.addEventListener("mousedown", function (e) {
        mouse.x = e.x;
        mouse.y = e.y;
        moveLock = false;
    });

    window.addEventListener("mousemove", function (e) {
        // if (moveLock) return;
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener("mouseup", function (e) {
        moveLock = true;
    });


    var ctx = canvas.getContext("2d");

    /**
     * 粒子
     * @param x x坐标
     * @param y y坐标
     * @param r 半径
     * @param dx 每帧运动的x方向上的距离
     * @param dy 每帧运动的y方向上的距离
     * @param color 颜色
     * @constructor
     */
    function Particle(x, y, r, dx, dy, color) {
        this.x = x; // x坐标
        this.y = y; // y坐标
        this.r = r; // 半径
        this.minR = r;  // 最小的半径
        this.dx = dx;   // 每帧运动的x方向上的距离
        this.dy = dy;   // 每帧运动的y方向上的距离
        this.color = color; // 颜色

        /**
         * 画
         */
        this.draw = function () {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fill();
        };

        /**
         * 更新
         */
        this.update = function () {
            this.x += this.dx;
            this.y += this.dy;
            if (this.x < 0 || this.x > winSize.width - this.r) {
                this.dx = -this.dx
            }
            if (this.y < 0 || this.y > winSize.height - this.r) {
                this.dy = -this.dy
            }

            if (!moveLock
                && Math.abs(mouse.x - this.x) < 50
                && Math.abs(mouse.y - this.y) < 50) {
                this.r < config.maxR ? this.r += 1 : 0;
            } else if (this.r >= this.minR) {
                this.r -= 1;
            }

            this.draw();
        };
    }

    var particles = []; // 所有已经生成的粒子

    function init() {
        particles = [];

        for (var i = 0; i < config.count; i++) {
            var r = Math.random() * 3 + 1;
            var x = Math.random() * (winSize.width - 2 * r) + r;
            var y = Math.random() * (winSize.height - 2 * r) + r;
            var dx = (Math.random() - 0.5) * 5;
            var dy = (Math.random() - 0.5) * 5;
            var color = config.colors[~~(Math.random() * config.colors.length)];
            particles.push(new Particle(x, y, r, dx, dy, color));
        }
    }

    init();

    function drawAll() {
        ctx.clearRect(0, 0, winSize.width, winSize.height);
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        requestAnimationFrame(drawAll);
    }

    drawAll();

})(config);




