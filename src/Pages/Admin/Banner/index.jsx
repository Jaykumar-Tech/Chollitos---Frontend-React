import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Icon,
  Progress,
  Badge,
  Heading,
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import { _t } from "../../../Utils/_t";

const Banner = () => {
  const [banner, setBanner] = useState('');
  const [isloading, setIsloading] = useState(false);
  const { t } = useTranslation();

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link'],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        ['clean']
      ],
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'align',
    'list',
    'ordered',
    'bullet',
    'color',
    'background',
    'clean',
  ];

  const getBanner = async () => {
    setIsloading(true);
    // const data = await getBannerService();
    // setBanner(data);
    setIsloading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getBanner();
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{t(_t("Chollitos"))} - {t(_t("banner"))} </title>
      </Helmet>
      <Box maxW={'1200px'} m={'auto'}>
        <Box>
          <Heading textAlign={'center'} p={5} size={'lg'}>{t(_t('Banner Management'))}</Heading>
        </Box>
        {isloading ?
          <Progress colorScheme={'blue'} size="xs" isIndeterminate />
          :
          <Box p={'2px'} />
        }
        <Box
          bg={'white'}
          borderRadius={5}
          p={'20px'}
          shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
        >
          <ReactQuill
            name="banner"
            theme="snow"
            modules={modules}
            formats={formats}
            value={banner}
            onChange={(content) => setBanner(content)}
          />
        </Box>
      </Box>
    </>
  )
}

export default Banner;