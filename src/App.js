import React, { useState } from 'react'
import './App.scss'
import Canvas from './Canvas'

function App() {
    const [step, setStep] = useState(0)
    //const newGame = new Game(setStep)
    const [newGame, setNewGame] = useState(new Game(setStep))

    return (
        <div className="App">
            <div className="ctrl">
                <button onClick={newGame.togglePause}>Pause</button>
                <button onClick={newGame.randomGrid}>Rnd</button>
                <button onClick={newGame.manualStep}>Prog</button>

                <div>Step: {step}</div>
            </div>
            <Canvas draw={newGame.draw} height={1000} width={'1000'} />
        </div>
    )
}

export default App

class Game {
    constructor(setStep) {
        this.pause = false
        this.last = 0
        this.speed = 200
        this.step = 0
        this.setStep = setStep

        this.numberOfDivisions = 100
        this.createGrid()
        this.draw = this.draw.bind(this)
        this.togglePause = this.togglePause.bind(this)
        this.createGrid = this.createGrid.bind(this)
        this.drawGrid = this.drawGrid.bind(this)
        this.togglePosition = this.togglePosition.bind(this)
        this.randomGrid = this.randomGrid.bind(this)
        this.checkPosition = this.checkPosition.bind(this)
        this.setPosition = this.setPosition.bind(this)
        this.progressGrid = this.progressGrid.bind(this)
        this.manualStep = this.manualStep.bind(this)

        this.togglePosition(1, 1)
    }

    draw(ctx, internalFrameCount, now) {
        let timeInSecond = now

        if (!this.pause) {
            if (timeInSecond - this.last >= this.speed) {
                this.last = now
                this.step++
                this.setStep(this.step)
                this.drawGrid(ctx)
                this.progressGrid()
            }
        }
    }

    createGrid() {
        this.grid = Array(this.numberOfDivisions)
            .fill(false)
            .map(() => Array(this.numberOfDivisions).fill(false))
    }

    togglePosition(x, y) {
        this.grid[x][y] = !this.grid[x][y]
    }

    setPosition(x, y, bool) {
        this.grid[x][y] = bool
    }

    togglePause() {
        this.pause = !this.pause
    }

    manualStep() {
        this.drawGrid()
    }

    randomGrid() {
        for (let x = 0; x < this.numberOfDivisions; x++) {
            for (let y = 0; y < this.numberOfDivisions; y++) {
                this.grid[x][y] = Math.random() < 0.1
            }
        }
    }

    progressGrid() {
        let oldGrid = [...this.grid]

        for (let x = 0; x < this.numberOfDivisions; x++) {
            for (let y = 0; y < this.numberOfDivisions; y++) {
                this.checkPosition(oldGrid, x, y)
            }
        }
    }

    checkPosition(grid, x, y) {
        let neighbours = 0

        let xmin = x !== 0 ? -1 : 0
        let xmax = x !== this.numberOfDivisions - 1 ? +1 : 0
        let ymin = y !== 0 ? -1 : 0
        let ymax = y !== this.numberOfDivisions - 1 ? +1 : 0

        for (let xi = xmin; xi <= xmax; xi++) {
            for (let yi = ymin; yi <= ymax; yi++) {
                if (xi !== 0 || yi !== 0) {
                    if (grid[x + xi][y + yi]) neighbours++
                }
            }
        }
        if (neighbours < 2 || neighbours > 3) {
            this.setPosition(x, y, false)
        }
        if (neighbours === 3) {
            this.setPosition(x, y, true)
        }
    }

    drawGrid(ctx) {
        this.grid.forEach((x, xi) => {
            x.forEach((y, yi) => {
                ctx.fillStyle = y ? '#fff' : '#000'
                ctx.fillRect(
                    xi * (ctx.canvas.width / this.numberOfDivisions),
                    yi * (ctx.canvas.width / this.numberOfDivisions),
                    ctx.canvas.width / this.numberOfDivisions,
                    ctx.canvas.width / this.numberOfDivisions
                )
            })
        })
    }
}
