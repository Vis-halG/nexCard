export default function NexCard({ data }) {
  return (
    <div
      className="min-h-screen flex justify-center items-start p-4"
      style={{ background: data?.theme?.background || "#f3f4f6" }}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* 🔥 HEADER */}
        <div
          className="h-24"
          style={{ background: data?.theme?.primary || "#6366f1" }}
        />

        {/* 🔥 PROFILE */}
        <div className="text-center -mt-12 px-4">
          <img
            src={data?.image || "https://i.pravatar.cc/150"}
            alt="profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-white object-cover"
          />

          <h2 className="text-xl font-bold mt-2">{data?.name || "No Name"}</h2>
          <p className="text-gray-500 text-sm">{data?.title || ""}</p>
        </div>

        {/* 📞 ACTION BUTTONS */}
        <div className="flex gap-2 mt-4 px-4">
          {data?.phone && (
            <a
              href={`tel:${data.phone}`}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white p-2 text-center rounded-lg text-sm"
            >
              📞 Call
            </a>
          )}

          {data?.phone && (
            <a
              href={`https://wa.me/${data.phone}`}
              target="_blank"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 text-center rounded-lg text-sm"
            >
              💬 WhatsApp
            </a>
          )}
        </div>

        {/* 📧 INFO */}
        <div className="mt-4 px-4 space-y-2 text-sm">
          {data?.email && <p>📧 {data.email}</p>}
          {data?.address && <p>📍 {data.address}</p>}
          {data?.website && (
            <a
              href={data.website}
              target="_blank"
              className="text-blue-600 underline"
            >
              🌐 Visit Website
            </a>
          )}
        </div>

        {/* 🌐 SOCIAL */}
        <div className="flex gap-4 mt-4 justify-center text-sm">
          {data?.social?.instagram && (
            <a href={data.social.instagram} target="_blank">📸 Instagram</a>
          )}
          {data?.social?.linkedin && (
            <a href={data.social.linkedin} target="_blank">💼 LinkedIn</a>
          )}
          {data?.social?.twitter && (
            <a href={data.social.twitter} target="_blank">🐦 Twitter</a>
          )}
        </div>

        {/* 🧾 ABOUT */}
        {data?.about && (
          <div className="mt-4 px-4">
            <h3 className="font-semibold mb-1">About</h3>
            <p className="text-sm text-gray-600">{data.about}</p>
          </div>
        )}

        {/* 🛠 SERVICES */}
        {data?.services?.length > 0 && (
          <div className="mt-4 px-4">
            <h3 className="font-semibold mb-1">Services</h3>
            <ul className="list-disc ml-4 text-sm text-gray-600">
              {data.services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 🖼 GALLERY */}
        {data?.gallery?.length > 0 && (
          <div className="mt-4 px-4 pb-4">
            <h3 className="font-semibold mb-2">Gallery</h3>

            <div className="grid grid-cols-3 gap-2">
              {data.gallery.map((img, i) =>
                img ? (
                  <img
                    key={i}
                    src={img}
                    alt="gallery"
                    className="rounded-lg object-cover w-full h-24"
                  />
                ) : null
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}