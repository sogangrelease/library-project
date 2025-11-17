const BookImage = ({ src, alt }) => {
    return <img src={src} alt={alt} style={{ width: '100px', height: '150px', objectFit: 'cover' }} />;
}

export default BookImage;