'use client';

import { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '@/components/Card';
import { FeedProps, MapListInfo } from '@/types/type';
import styled from 'styled-components';
import Input from '@/components/Input';
import Back from '../../../public/svgs/back.svg';
import Filter from '../../../public/svgs/filter.svg';
import { useSearchParams } from 'next/navigation';
import { getSpotLists } from '@/services/location';

// kakao 라는 객체가 window에 존재하고 있다고 인식시켜주기 위함
declare global {
  interface Window {
    kakao: any;
  }
}

type MarkersType = {
  [index: number]: any;
};

interface BoundsType {
  ha: number;
  oa: number;
  pa: number;
  qa: number;
}

interface FetchApiProps {
  mapX: string;
  mapY: string;
  keyword: string | null;
  radius?: number;
}
const testData: FeedProps[] = [
  {
    contentid: 1,
    cardType: 'map',
    serviceType: 'default',
    title: '파주 풀빌라',
    firstimage:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    firstimage2:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    addr1: '서울특별시 종로구 사직로 161',
    addr2: '',
    image: 'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    inWishlist: false,
    location: '서울특별시 종로구 사직로 161',
    mapx: 33.450705,
    mapy: 126.570677,
  },
  {
    contentid: 2,
    cardType: 'map',
    serviceType: 'default',
    title: '파주 풀빌라',
    firstimage:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    firstimage2:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    addr1: '서울특별시 종로구 사직로 161',
    addr2: '',
    image: 'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    inWishlist: false,
    location: '서울특별시 종로구 사직로 161',
    mapx: 33.450936,
    mapy: 126.569477,
  },
  {
    contentid: 3,
    cardType: 'map',
    serviceType: 'default',
    title: '파주 풀빌라',
    firstimage:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    firstimage2:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    addr1: '서울특별시 종로구 사직로 161',
    addr2: '',
    image: 'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    inWishlist: false,
    location: '서울특별시 종로구 사직로 161',
    mapx: 33.450879,
    mapy: 126.56994,
  },
  {
    contentid: 4,
    cardType: 'map',
    serviceType: 'default',
    title: '파주 풀빌라',
    firstimage:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    firstimage2:
      'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    addr1: '서울특별시 종로구 사직로 161',
    addr2: '',
    image: 'http://tong.visitkorea.or.kr/cms/resource/93/2571393_image2_1.PNG',
    inWishlist: false,
    location: '서울특별시 종로구 사직로 161',
    mapx: 33.451393,
    mapy: 126.570738,
  },
];

const SliderContainer = styled.div`
  position: relative;
  bottom: 196px;
  z-index: 10;
  padding: 20px;
  .slick-slide {
    padding-right: 10px;
  }
`;

export default function Map() {
  // 지도 화면을 띄우기 위한 ref
  const mapRef = useRef<HTMLDivElement>(null);

  // marker 관련 state
  const markerImageSrc = '/svgs/ping.svg';
  const activeMarkerImageSrc = '/svgs/ping-active.svg';
  const activeMarkerRef = useRef<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);

  // map object 관련 state
  const mapObjectRef = useRef<any>(null);
  const [bounds, setBounds] = useState<BoundsType>();
  const centerLng = useRef({
    latitude: 0,
    longitude: 0,
  });

  const [mapList, setMapList] = useState<MapListInfo[]>([]);

  const sliderRef = useRef<Slider | null>(null);

  const searchParams = useSearchParams();

  const type = searchParams.get('type');
  const keyword = searchParams.get('keyword');
  const contentId = searchParams.get('contentId');
  const contentTypeId = searchParams.get('contentTypeId');

  // 카드 슬라이드시 이벤트 함수
  const onSlideChange = (index: number) => {
    const currentMarker = markers[Math.round(index)];
    // 마커 이미지
    const markerImage = new window.kakao.maps.MarkerImage(
      markerImageSrc,
      new window.kakao.maps.Size(20, 20),
    );
    const activeMarkerImage = new window.kakao.maps.MarkerImage(
      activeMarkerImageSrc,
      new window.kakao.maps.Size(36, 43),
    );

    // 그 전 마커 비활성화
    if (activeMarkerRef.current) activeMarkerRef.current.setImage(markerImage);

    // 현재 마커 좌표로 중심 이동
    mapObjectRef.current.setCenter(currentMarker.getPosition());

    // 현재 마커 활성화
    currentMarker.setImage(activeMarkerImage);
    activeMarkerRef.current = currentMarker;
  };

  // 슬라이드 설정
  const sliderSettings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.05,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => {
      onSlideChange(index);
    },
  };

  const onWishClick = (id: string) => {
    console.log(id);
    // api 연동 예정
  };

  const fetchLocationLists = async ({
    mapX,
    mapY,
    keyword,
    radius,
  }: FetchApiProps) => {
    if (true) {
      // feed에서 지도로 이동했을 경우
      const result = await getSpotLists({
        mapX,
        mapY,
        keyword,
        radius,
      });
      console.log(result);
      setMapList(result.items.item);
    } else if (contentId) {
      // detail에서 지도로 이동했을 경우
      // 얘는 근데 따로 빼도 될듯
    } else {
      // 정상적인 루트가 아닐 경우
    }
  };

  useEffect(() => {
    // 중심좌표 저장하기
    centerLng.current = {
      latitude: 33.4759722639,
      longitude: 126.5481687628,
    };
    fetchLocationLists({
      mapX: '126.5481687628',
      mapY: '33.4759722639',
      radius: 1000,
      keyword,
    });
    window.kakao.maps.load(() => {
      const options = {
        // 지도 중심 좌표
        center: new window.kakao.maps.LatLng(33.4759722639, 126.5481687628),
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      mapObjectRef.current = map;
      // 스케일별로 그냥 비교하면서 레벨이랑 대충 때려 맞추자

      // 지도 이동 이벤트 리스너
      window.kakao.maps.event.addListener(map, 'zoom_changed', function () {
        console.log(map.getLevel());
      });

      window.kakao.maps.event.addListener(map, 'dragend', async function () {
        const newBounds: BoundsType = map.getBounds();

        // 이전 중심좌표의 경도 > 우측좌표 OR 이전 중심좌표의 경도 < 좌측좌표
        if (
          centerLng.current.longitude > newBounds.oa ||
          centerLng.current.longitude < newBounds.ha
        ) {
          // todo: 이부분 중복코드니까 함수로 만들까
          const newCenter = map.getCenter();
          // 새로운 중심좌표를 기준으로 하여 api 호출
          // await fetchLocationLists({
          //   mapX: newCenter.La,
          //   mapY: newCenter.Ma,
          //   keyword,
          //   radius: 5000,
          // });
          // 중심좌표 업데이트
          centerLng.current = {
            latitude: newCenter.Ma,
            longitude: newCenter.La,
          };
        }

        // 이전 중심좌표의 위도 > 위쪽 좌표 OR 이전 중심좌표 위도 < 아래 좌표
        if (
          centerLng.current.latitude > newBounds.pa ||
          centerLng.current.latitude < newBounds.qa
        ) {
          const newCenter = map.getCenter();
          // 새로운 중심좌표를 기준으로 하여 api 호출
          // await fetchLocationLists({
          //   mapX: newCenter.La,
          //   mapY: newCenter.Ma,
          //   keyword,
          //   radius: 5000,
          // });
          // 중심좌표 업데이트
          centerLng.current = {
            latitude: map.getCenter().Ma,
            longitude: map.getCenter().La,
          };
        }
      });
    });
  }, []);

  useEffect(() => {
    window.kakao.maps.load(() => {
      // 마커 이미지
      const markerImage = new window.kakao.maps.MarkerImage(
        markerImageSrc,
        new window.kakao.maps.Size(20, 20),
      );
      const activeMarkerImage = new window.kakao.maps.MarkerImage(
        activeMarkerImageSrc,
        new window.kakao.maps.Size(36, 43),
      );

      // 여러개 마커 생성
      mapList.forEach(list => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(list.mapy, list.mapx),
          id: list.contentid,
          title: list.title,
          image: markerImage,
          clickable: true,
        });

        marker.setMap(mapObjectRef.current);

        // 마커 객체 저장
        setMarkers(prevData => [...prevData, marker]);

        console.log(markers);

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          if (!activeMarkerRef.current || activeMarkerRef.current !== marker) {
            // 활성화 되어있는 마커가 없거나 클릭한 마커와 활성화된 마커가 다를 경우
            if (activeMarkerRef.current)
              activeMarkerRef.current.setImage(markerImage); // 그 전 마커 비활성화
            marker.setImage(activeMarkerImage); // 클릭된 마커 활성화
            sliderRef.current?.slickGoTo(list.contentid - 1);
          }
          activeMarkerRef.current = marker;
        });
      });
    });
  }, [mapList]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-sm h-full overflow-hidden relative">
        <div className="z-10 absolute top-[54px] w-full px-6">
          <Input
            leftIcon={<Back />}
            rightIcon={<Filter />}
            placeholder="검색어"
            // onChange={setInputValue}
          />
        </div>
        <div ref={mapRef} className="h-screen" />
        <SliderContainer>
          <Slider
            ref={(slider: Slider | null) => {
              sliderRef.current = slider;
            }}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...sliderSettings}
          >
            {mapList?.map(list => (
              <Card
                key={list.contentid}
                id={list.contentid}
                cardType="map"
                serviceType="default"
                title={list.title}
                location={list.addr1}
                image={list.firstImage || '/svgs/job-default.svg'}
                onCardClick={() => {}}
                onWishListClick={onWishClick}
              />
            ))}
          </Slider>
        </SliderContainer>
      </div>
    </div>
  );
}
