import { connect } from 'mongoose';
const mongodb = async () => {
    const mongoUrl = process.env.mongoUrl
    connect(mongoUrl)
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.log(`Error connecting to mongodb: ${error}`))
}
export default mongodb;