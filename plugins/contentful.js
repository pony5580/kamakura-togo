const contentful = require('contentful')

const config = {
  space: 'x03a15umb8pb',
  accessToken: '2Dbhak9K6oOG867_hz29icWbEeEHog_QyFzKIm2E5_o',
}

const client = contentful.createClient(config)

export default client
