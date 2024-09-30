'use client';

import { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '@/components/Card';
import { GetLocationProps, MapListInfo } from '@/types/type';
import styled from 'styled-components';
import Input from '@/components/Input';
import Back from '../../../public/svgs/back.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSpotDetail, getSpotLocations } from '@/services/spots';
import { getStayLocations } from '@/services/stays';

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
  const centerLngRef = useRef({
    latitude: 0,
    longitude: 0,
  });
  const [detailLng, setDetailLng] = useState({
    latitude: 0,
    longitude: 0,
  });
  const levelRef = useRef(3);
  const isMarkerClickRef = useRef(false);

  const [mapList, setMapList] = useState<MapListInfo[]>([]);

  const sliderRef = useRef<Slider | null>(null);

  const router = useRouter();

  const searchParams = useSearchParams();

  // todo: type, mapx, mapy 가 없을 경우 exception page 이동

  const type = searchParams.get('type');
  const location = searchParams.get('location');
  const keyword = searchParams.get('keyword');
  const mapx = searchParams.get('mapx');
  const mapy = searchParams.get('mapy');
  const contentId = searchParams.get('contentId');
  const contentTypeId = searchParams.get('contentTypeId');

  // 카드 슬라이드시 이벤트 함수
  const onSlideChange = (index: number) => {
    // 카드를 직접 슬라이드 할 경우에만 마커 이미지를 변경
    // 마커를 클릭했을 때는 마커 클릭 이벤트 함수에서 해당 기능을 수행하기 때문
    if (!isMarkerClickRef.current) {
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
      if (activeMarkerRef.current)
        activeMarkerRef.current.setImage(markerImage);

      // 현재 마커 좌표로 중심 이동
      mapObjectRef.current.setCenter(currentMarker.getPosition());

      // 현재 마커 활성화
      currentMarker.setImage(activeMarkerImage);
      activeMarkerRef.current = currentMarker;
    }
    // 마커 선택 여부 초기화
    isMarkerClickRef.current = false;
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

  const wishClick = (id: string) => {
    console.log(id);
    // api 연동 예정
  };

  const fetchLocationLists = async ({
    mapX,
    mapY,
    keyword,
    radius,
    numOfRows,
  }: GetLocationProps) => {
    if (type && mapx && mapy) {
      if (type === 'tour') {
        // 관광 피드에서 지도로 이동했을 경우
        const result = await getSpotLocations({
          mapX,
          mapY,
          keyword,
          radius,
          numOfRows,
        });
        if (result === 'no data') {
          setMapList([]);
        } else {
          setMapList(result.items.item);
        }
      } else if (type === 'stay') {
        // 숙소 피드에서 지도로 이동했을 경우
        const result = await getStayLocations({
          mapX,
          mapY,
          keyword,
          radius,
          numOfRows,
        });
        if (result === 'no data') {
          setMapList([]);
        } else {
          setMapList(result.items.item);
        }
      }
    } else if (contentId && contentTypeId) {
      // 상세페이지에서 지도로 이동했을 경우
      try {
        const result = await getSpotDetail(
          Number(contentId),
          Number(contentTypeId),
        );

        // map 정보 저장
        setMapList([
          ...mapList,
          {
            contentid: result.data.contentid,
            contenttypeid: result.data.contenttypeid,
            title: result.data.title,
            addr1: result.data.addr1,
            firstimage: result.data.firstimage,
            mapx: result.data.mapx,
            mapy: result.data.mapy,
          },
        ]);
      } catch (e) {
        console.log(e);
        // todo: 에러 페이지로 이동
      }
    } else {
      // 유효하지 않은 경로일경우
    }
  };

  const getMapRadius = (level: number) => {
    if (level > 4) {
      return level * 100 * Math.floor(level / 3) + 200;
    } else {
      return 100 * Math.floor(level / 3) + 200;
    }
  };

  useEffect(() => {
    // 처음 api 호출할 때는 radius 1400으로 고정
    fetchLocationLists({
      mapX: mapx,
      mapY: mapy,
      radius: 1400,
      keyword,
      numOfRows: 50,
    });

    // 피드에서 지도로 이동한 경우에만 적용
    window.kakao.maps.load(() => {
      if (type && mapx && mapy) {
        const options = {
          // 지도 중심 좌표 (default level은 4로 고정)
          center: new window.kakao.maps.LatLng(mapy, mapx),
          level: 4,
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(mapRef.current, options);
        mapObjectRef.current = map;
        // 중심좌표 저장하기
        centerLngRef.current = {
          latitude: Number(mapy),
          longitude: Number(mapx),
        };

        // 지도 줌 아웃 리스너
        window.kakao.maps.event.addListener(map, 'zoom_changed', function () {
          const newLevel = map.getLevel();
          const newCenter = map.getCenter();
          if (newLevel > levelRef.current) {
            // 새로운 레벨과 현재 중심좌표를 기준으로 api 호출
            fetchLocationLists({
              mapX: newCenter.La,
              mapY: newCenter.Ma,
              radius: getMapRadius(newLevel),
              numOfRows: newLevel === 3 || newLevel === 4 ? 50 : 30, // level이 3 또는 4일 경우에만 최대 item 50개 설정
              keyword,
            });
          }
          // 레벨 업데이트
          levelRef.current = newLevel;
        });

        // 지도 드래그 리스너
        window.kakao.maps.event.addListener(map, 'dragend', async function () {
          const newBounds: BoundsType = map.getBounds();

          // 양 옆으로 드래그 할 때
          // [이전 중심좌표의 경도 > 우측좌표 OR 이전 중심좌표의 경도 < 좌측좌표] 일때만 api 호출
          if (
            centerLngRef.current.longitude > newBounds.oa ||
            centerLngRef.current.longitude < newBounds.ha
          ) {
            const newCenter = map.getCenter();
            // 새로운 중심좌표를 기준으로 하여 api 호출
            await fetchLocationLists({
              mapX: newCenter.La,
              mapY: newCenter.Ma,
              keyword,
              radius: getMapRadius(levelRef.current),
            });
            // 중심좌표 업데이트
            centerLngRef.current = {
              latitude: newCenter.Ma,
              longitude: newCenter.La,
            };
          }

          // 위 아래로 드래그 할 때
          // [이전 중심좌표의 위도 > 위쪽 좌표 OR 이전 중심좌표 위도 < 아래 좌표] 일때만 api 호출
          if (
            centerLngRef.current.latitude > newBounds.pa ||
            centerLngRef.current.latitude < newBounds.qa
          ) {
            const newCenter = map.getCenter();
            // 새로운 중심좌표를 기준으로 하여 api 호출
            await fetchLocationLists({
              mapX: newCenter.La,
              mapY: newCenter.Ma,
              keyword,
              radius: getMapRadius(levelRef.current),
            });
            // 중심좌표 업데이트
            centerLngRef.current = {
              latitude: map.getCenter().Ma,
              longitude: map.getCenter().La,
            };
          }
        });
      }
    });
  }, []);

  // 마커 생성
  useEffect(() => {
    window.kakao.maps.load(() => {
      if (contentId && contentTypeId && mapList.length > 0) {
        console.log(mapList[0].mapx);
        const options = {
          // 지도 중심 좌표 (default level은 4로 고정)
          center: new window.kakao.maps.LatLng(
            mapList[0].mapy,
            mapList[0].mapx,
          ),
          level: 4,
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(mapRef.current, options);
        mapObjectRef.current = map;
        // 중심좌표 저장하기
        centerLngRef.current = {
          latitude: Number(mapList[0].mapy),
          longitude: Number(mapList[0].mapx),
        };
        console.log(map.getCenter());
      }
      if (markers) {
        markers.forEach(marker => {
          marker.setMap(null);
        });
        setMarkers([]);
      }
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
      mapList.forEach((list, index) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(list.mapy, list.mapx),
          id: list.contentid,
          title: list.title,
          image: index !== 0 ? markerImage : activeMarkerImage,
          clickable: true,
        });

        if (index === 0) {
          activeMarkerRef.current = marker;
        }

        marker.setMap(mapObjectRef.current);

        // 마커 객체 저장
        setMarkers(prevData => [...prevData, marker]);

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          isMarkerClickRef.current = true; // card slide로 인한 마커 이미지 변경을 막기 위함
          console.log(marker.getPosition());
          if (!activeMarkerRef.current || activeMarkerRef.current !== marker) {
            // 활성화 되어있는 마커가 없거나 클릭한 마커와 활성화된 마커가 다를 경우
            if (activeMarkerRef.current)
              activeMarkerRef.current.setImage(markerImage); // 그 전 마커 비활성화
            mapObjectRef.current.setCenter(marker.getPosition()); // 클릭된 마커로 중심좌표 이동
            marker.setImage(activeMarkerImage); // 클릭된 마커 활성화
            sliderRef.current?.slickGoTo(index);
          }
          activeMarkerRef.current = marker;
        });
      });
    });
  }, [mapList]);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="sm:max-w-sm h-full overflow-hidden relative w-full">
        <div className="z-10 absolute top-[54px] w-full px-6">
          <Input
            leftIcon={<Back />}
            onClick={() => {
              router.back();
            }}
            value={''}
            placeholder={(keyword ? keyword : location) || ''}
            disabled
            readOnly
          />
        </div>
        <div ref={mapRef} className="h-screen w-full" />
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
                image={list.firstimage || '/svgs/job-default.svg'}
                onCardClick={() => {
                  router.push(
                    `/spot/${contentId}?contenttypeid=${contentTypeId}&type=${type}`,
                  );
                }}
                onWishListClick={wishClick}
              />
            ))}
          </Slider>
        </SliderContainer>
      </div>
    </div>
  );
}
