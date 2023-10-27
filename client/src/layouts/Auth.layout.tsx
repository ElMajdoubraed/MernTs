import { Grid } from "@mui/material";
import styled from "styled-components";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { map } from "lodash";

const CenterLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const images = [
  {
    label: "login-background",
    imgPath:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1655&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "login-background",
    imgPath:
      "https://images.unsplash.com/photo-1501556424050-d4816356b73e?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "login-background",
    imgPath:
      "https://images.unsplash.com/photo-1653260449106-de99850d87e7?auto=format&fit=crop&q=80&w=1827&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    label: "login-background",
    imgPath:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1664&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <CenterLayout>{children}</CenterLayout>
      </Grid>
      <Grid
        item
        xs={0}
        sm={6}
        display={{
          xs: "none",
          sm: "block",
        }}
      >
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          navigation={true}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          className="w-full h-full max-h-screen"
        >
          {map(images, (image, index) => (
            <SwiperSlide key={index}>
              <img
                className="w-full h-full object-cover object-center max-h-screen"
                src={image.imgPath}
                alt={image.label}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
}
