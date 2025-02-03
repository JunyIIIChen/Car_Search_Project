const express = require("express");
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3002;

// 中间件
app.use(express.json());
app.use(cors());

// 读取 JSON 文件的辅助函数
async function readCarsData() {
    try {
        const data = await fs.readFile(path.join(__dirname, 'data', 'cars.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading cars data:', error);
        return { cars: [] };
    }
}

// 写入 JSON 文件的辅助函数
async function writeCarsData(data) {
    try {
        await fs.writeFile(
            path.join(__dirname, 'data', 'cars.json'),
            JSON.stringify(data, null, 2),
            'utf8'
        );
    } catch (error) {
        console.error('Error writing cars data:', error);
        throw error;
    }
}

// 获取所有车辆
app.get("/cars", async (req, res) => {
    try {
        const data = await readCarsData();
        res.json(data.cars);
    } catch (error) {
        res.status(500).json({ error: "数据读取失败" });
    }
});

// 获取单个车辆
app.get("/cars/:id", async (req, res) => {
    try {
        const data = await readCarsData();
        const car = data.cars.find(c => c.id === parseInt(req.params.id));
        if (!car) {
            return res.status(404).json({ error: "车辆未找到" });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ error: "数据读取失败" });
    }
});

// 添加新车辆
app.post("/cars", async (req, res) => {
    try {
        const data = await readCarsData();
        const newCar = {
            id: data.cars.length + 1,
            ...req.body
        };
        data.cars.push(newCar);
        await writeCarsData(data);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ error: "添加车辆失败" });
    }
});

// 更新车辆信息
app.put("/cars/:id", async (req, res) => {
    try {
        const data = await readCarsData();
        const index = data.cars.findIndex(c => c.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: "车辆未找到" });
        }
        data.cars[index] = { ...data.cars[index], ...req.body };
        await writeCarsData(data);
        res.json(data.cars[index]);
    } catch (error) {
        res.status(500).json({ error: "更新车辆失败" });
    }
});

// 删除车辆
app.delete("/cars/:id", async (req, res) => {
    try {
        const data = await readCarsData();
        const index = data.cars.findIndex(c => c.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: "车辆未找到" });
        }
        data.cars.splice(index, 1);
        await writeCarsData(data);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "删除车辆失败" });
    }
});

// 多条件搜索
app.get("/car", async (req, res) => {
    try {
        const data = await readCarsData();
        let filteredCars = data.cars;

        for (const key in req.query) {
            if (req.query[key]) {
                if (key === "odometer_min" || key === "odometer_max") continue;

                filteredCars = filteredCars.filter(car => {
                    const carValue = car[key];
                    const queryValue = req.query[key];

                    if (typeof carValue === "number") {
                        return carValue === parseInt(queryValue);
                    }

                    if (typeof carValue === "string") {
                        return carValue.toLowerCase().includes(queryValue.toLowerCase());
                    }

                    return false;
                });
            }
        }

        // 处理 odometer 范围
        if (req.query.odometer_min || req.query.odometer_max) {
            const min = parseInt(req.query.odometer_min) || 0;
            const max = parseInt(req.query.odometer_max) || Infinity;
            filteredCars = filteredCars.filter(car => {
                const odo = parseInt(car.odometer);
                return odo >= min && odo <= max;
            });
        }

        res.json(filteredCars);
    } catch (error) {
        res.status(500).json({ error: "搜索失败" });
    }
});


// 启动服务器
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});