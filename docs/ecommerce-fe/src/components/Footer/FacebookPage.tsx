'use client'

const FacebookPage = () => {
  return (
    <div className="w-full min-w-[400px] md:w-1/3">
      <h2 className="text-lg font-medium mb-4">FANPAGE FACEBOOK</h2>
      <div className="w-[500px] bg-white rounded overflow-hidden">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftopxedap&tabs=timeline&width=500&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="500"
          height="300"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
    </div>
  )
}

export default FacebookPage
