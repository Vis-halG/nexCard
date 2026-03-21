"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function NexCard({ data }) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Profile */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 text-center">
          <img
            src={data.image}
            className="w-24 h-24 mx-auto rounded-full border-4 border-white object-cover"
          />
          <h2 className="mt-3 text-xl font-bold">{data.name}</h2>
          <p className="text-sm">{data.title}</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-3 gap-3 p-4 text-center">
          <a href={`tel:${data.phone}`} className="bg-gray-100 p-3 rounded-xl">
            📞
            <p className="text-xs">Call</p>
          </a>

          <a
            href={`https://wa.me/${data.phone}`}
            className="bg-gray-100 p-3 rounded-xl"
          >
            💬
            <p className="text-xs">WhatsApp</p>
          </a>

          <a
            href={`mailto:${data.email}`}
            className="bg-gray-100 p-3 rounded-xl"
          >
            📧
            <p className="text-xs">Email</p>
          </a>
        </div>

        {/* About */}
        <div className="px-4">
          <h3 className="font-semibold">About</h3>
          <p className="text-sm text-gray-600">{data.about}</p>
        </div>

        {/* save contact button */}
        <div className="p-4">
          <a
            href="/contact.vcf"
            download
            className="block text-center bg-green-600 text-white py-2 rounded-xl"
          >
            Save Contact
          </a>
        </div>

        <div className="p-4 text-center">
          <h3 className="font-semibold mb-2">Scan QR</h3>

          <QRCodeCanvas
            value={typeof window !== "undefined" ? window.location.href : ""}
            size={120}
          />
        </div>
      </div>
    </div>
  );
}
