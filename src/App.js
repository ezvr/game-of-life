import React, { useState } from 'react'
import './App.scss'
import Canvas from './Canvas'

function App() {
    const [step, setStep] = useState(0)
    const newGame = new Game(setStep)

    return (
        <div className="App">
            <button onClick={newGame.togglePause}>Pause</button>
            <button
                onClick={() => {
                    newGame.togglePosition(4, 4)
                    setStep(newGame.grid[4][4])
                }}
            >
                Toggle 4,4
            </button>
            <div>Step: {step ? 'True' : 'False'}</div>
            <Canvas draw={newGame.draw} height={500} width={'500'} />
        </div>
    )
}

export default App

class Game {
    constructor(setStep) {
        this.pause = false
        this.last = 0
        this.speed = 2000
        this.step = 0
        this.setStep = setStep

        this.numberOfDivisions = 10
        this.createGrid()
        this.draw = this.draw.bind(this)
        this.togglePause = this.togglePause.bind(this)
        this.createGrid = this.createGrid.bind(this)
        this.drawGrid = this.drawGrid.bind(this)
        this.togglePosition = this.togglePosition.bind(this)

        this.togglePosition(8, 5)
    }

    draw(ctx, internalFrameCount, now) {
        let timeInSecond = now

        if (!this.pause) {
            if (timeInSecond - this.last >= this.speed) {
                this.last = now
                this.drawGrid(ctx)
                console.log('Time: ', now)
            }
        }
    }

    createGrid() {
        this.grid = Array(this.numberOfDivisions)
            .fill(0)
            .map(() => Array(this.numberOfDivisions).fill(0))
    }

    togglePosition(x, y) {
        this.grid[x][y] = !this.grid[x][y]
    }

    togglePause() {
        this.pause = !this.pause
    }

    drawGrid(ctx) {
        this.grid.forEach((x, xi) => {
            x.forEach((y, yi) => {
                ctx.fillStyle = y === 0 ? '#000' : '#fff'
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
