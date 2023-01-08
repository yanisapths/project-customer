const withTM = require('next-transpile-modules')([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
])

module.exports = withTM(
  {
    reactStrictMode: true,
    images: {
      domains: [
      "ontariocaregiver.ca",
      "www.brookdale.com",
      "links.papareact.com","profile.line-scdn.net", "lh3.googleusercontent.com","platform-lookaside.fbsbx.com",
      "firebasestorage.googleapis.com",
      "www.pngplay.com","upload.wikimedia.org","www.freepnglogos.com","iconape.com",
      "ontariocaregiver.ca",
      "southamptonprimarycare.org.uk","bodyperformance.co.uk","www.figma.com","static.wixstatic.com"
    ],
  
    },
  }
)


