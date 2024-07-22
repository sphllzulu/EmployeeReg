import React, { useState } from 'react';

const Image = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {image && <img src={image} alt="Uploaded Preview" style={{ width: '300px', marginTop: '20px' }} />}
        </div>
    );
};

export default Image;
