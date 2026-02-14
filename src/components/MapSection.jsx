export default function MapSection() {
  return (
    <div>
      
      <div className="w-full h-[250px] rounded-md overflow-hidden">
         <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.1537272827286!2d31.28088877506196!3d30.061127717780963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583f1575099835%3A0x8feb30c28f5372b9!2z2YXYs9iq2LTZgdmKINin2YTYudix2KjZiiDZhdis2YXYuSDYudmK2KfYr9in2Kog2KfZhNin2YXZhA!5e0!3m2!1sen!2seg!4v1770166870736!5m2!1sen!2seg"
      width="600"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
      </div>

      <div className="text-center">
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=30.0610999,31.2835204"
          target="_blank"
          className="inline-block mt-3 bg-[#00A5B2] hover:bg-[#89C9C8] text-white px-3 py-2 rounded-md"
        >
          Get Directions
        </a>
      </div>

    </div>
  )
}
