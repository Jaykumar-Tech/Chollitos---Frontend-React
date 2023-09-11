import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Icon,
  Progress,
  Badge,
  Heading,
  useToast,
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import { useTranslation } from 'react-i18next';
import { _t } from "../../../Utils/_t";
import { getBannerService, saveBannerService } from "../../../Services/Banner";

const Banner = () => {
  const [banner, setBanner] = useState('');
  const [isloading, setIsloading] = useState(false);
  const { t } = useTranslation();
  const toast = useToast() ;

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
    const data = await getBannerService();
    setBanner(data.html);
    setIsloading(false);
  };

  const handleBannerSave = async () => {
    var result = await saveBannerService(banner);
    if ( result.status == 200 ) {
      toast({
        title: t(_t('Save Success.')),
        description: t(_t("Saved a banner successfully.")),
        position: 'top',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: t(_t('Error.')),
        description: result?.response?.data.message,
        position: 'top',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

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
        <Button variant="contained"
        onClick={handleBannerSave}
         color="primary">
          Save
        </Button>
      </Box>
    </>
  )
}

export default Banner;