export default {
    name: 'production',
    mysql: {
        username: 'verse',
        password: 'verse',
        multiStatement: false,
        dbName: 'mydb',
        host: 'localhost',
        enableLogging: false
    },
    app: {
        // host: 'ec2-52-53-128-32.us-west-1.compute.amazonaws.com',
        host: 'localhost',
        serveDummyStatusData: true
    }
}
