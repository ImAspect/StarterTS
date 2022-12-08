import './utils/loadEnv'
import app from './main'

app.listen(process.env.API_PORT as unknown as number, async () => {
  console.log('Listening on port [' + process.env.API_PORT + ']')
})
