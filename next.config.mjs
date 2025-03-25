// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.highlandernews.org" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "wallpapercave.com" },
      { protocol: "https", hostname: "picfiles.alphacoders.com" },
      { protocol: "https", hostname: "www.wheninmanila.com" },
      { protocol: "https", hostname: "www.tvinsider.com" },
      { protocol: "https", hostname: "c8.alamy.com" },
      { protocol: "https", hostname: "w0.peakpx.com" },
      { protocol: "https", hostname: "assets.mubicdn.net" },
      { protocol: "https", hostname: "pop.h-cdn.co" },
      { protocol: "https", hostname: "hustonsite.files.wordpress.com" },
      { protocol: "https", hostname: "resizing.flixster.com" },
      { protocol: "https", hostname: "i0.wp.com" },
      { protocol: "https", hostname: "thumb.canalplus.pro" },
      { protocol: "https", hostname: "www.fsa.uliege.be" },
      { protocol: "https", hostname: "images.affiches-et-posters.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "imgsrc.cineserie.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "dulaccinemas.com" },
      { protocol: "https", hostname: "proxymedia.woopic.com" },
      { protocol: "https", hostname: "le-cartographe.net" },
      { protocol: "https", hostname: "www.pieuvre.ca" },
      { protocol: "https", hostname: "4kwallpapers.com" },
      { protocol: "https", hostname: "i.ebayimg.com" },
      { protocol: "https", hostname: "fr.web.img4.acsta.net" },
      { protocol: "https", hostname: "fr.web.img2.acsta.net" },
      { protocol: "https", hostname: "musicart.xboxlive.com" },
      { protocol: "https", hostname: "www.bigflix.com" },
      { protocol: "https", hostname: "cdn.entries.clios.com" },
      { protocol: "https", hostname: "static.posters.cz" },
      { protocol: "https", hostname: "fr.web.img5.acsta.net" },
      { protocol: "https", hostname: "fr.web.img6.acsta.net" },
    ],
  },
};

export default nextConfig;
