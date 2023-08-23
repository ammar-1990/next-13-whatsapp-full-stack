/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXT_PUBLIC_ZEGO_APP_ID:379490813,
        NEXT_PUBLIC_ZEGO_SERVER_ID:"1a0491ff844c76621fe82b75fa788911"
    },
    images:{
        domains:['localhost']
    }
}

module.exports = nextConfig
