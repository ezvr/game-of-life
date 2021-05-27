import React, { useState } from 'react'
import './App.scss'
import Canvas from './Canvas'

function App() {
    const newGame = new Game(500, 500)

    return (
        <div className="App">
            <button onClick={newGame.togglePause}>Pause</button>
            <Canvas draw={newGame.draw} height={500} width={'500'} />
        </div>
    )
}

export default App

class Game {
    constructor() {
        this.pause = false
        this.draw = this.draw.bind(this)
        this.togglePause = this.togglePause.bind(this)
        this.setGrid = this.setGrid.bind(this)
        this.numberOfDivisions = 10
        this.setGrid()
    }

    draw(ctx, internalFrameCount) {
        if (this.pause) {
            return null
        }
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#fff'
        ctx.beginPath()
        ctx.arc(
            50,
            100,
            20 * Math.sin(internalFrameCount * 0.05) ** 2,
            0,
            2 * Math.PI
        )
        ctx.fill()
    }

    setGrid() {
        this.grid = Array(this.numberOfDivisions)
            .fill(0)
            .map(() => Array(this.numberOfDivisions).fill(0))
    }

    togglePause() {
        this.pause = !this.pause
    }
}
