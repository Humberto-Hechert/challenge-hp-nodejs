import app from './src/app'

const port = process.env.PORT || 3630

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})