import { useState, useEffect } from "react";

const useUpload = (e) => {
  const [uploadedImage, setImage] = useState({});
  const [loading, setLoading] = useState(true);

    const { files } = target;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "sickfits");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/duec6t3rs/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const { secure_url, eager } = await res.json();

    setImage({
      image: secure_url,
      largeImage: eager[0].secure_url,
    });

    setLoading(false);

  useEffect(() => {
    async function fetchData() {
      setError();
      const data = await fetch(url)
        .then((res) => res.json())
        .catch((err) => {
          setError(err);
        });
      setStats(data);
      setLoading(false);
    }
    fetchData();
  }, [url]);
  return {
    stats,
    loading,
    error,
  };
};

export default useUpload;
