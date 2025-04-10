import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
const { Meta } = Card;

function MovieList({ movies = [], addToCart }) {
  return (
    <Row gutter={[16, 24]} justify="center">
      {movies.map((movie) => (
        <Col key={movie.id} xs={24} sm={12} md={8} lg={6} xl={4}>
          <Card
            hoverable
            style={{
                width: '100%',
                maxWidth: 240,
                height: 460,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#1b263b',
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            cover={
              <Link to={`/movie/${movie.id}`}>
                <img
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  style={{
                    width: '100%',
                    height: 380,
                    objectFit: 'cover',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    backgroundColor: '#111' // เผื่อโหลดไม่ทัน
                  }}
                />
              </Link>
            }
          >
            <Meta title={movie.title} description={<span style={{ color: '#ccc' }}>{movie.release_date}</span>} />
            <p style={{ marginTop: 8 }}>ราคา: ฿{movie.price || 100}</p>
            <Button type="primary" block onClick={() => addToCart(movie)}>ใส่ตะกร้า</Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default MovieList;