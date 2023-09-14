import { useState, useEffect } from "react";
import { Text, CloseButton, Box } from "@chakra-ui/react";
import { getBannerService } from "../../Services/Banner";
import { InfoIcon } from "@chakra-ui/icons";

const Banner = () => {
  // const [isOpen, setIsOpen] = useState(sessionStorage.getItem('banner') === 'show');
  const [isOpen, setIsOpen] = useState(false);
  const [banner, setBanner] = useState('');

  const getBanner = async () => {
    const data = await getBannerService();
    console.log(data);
    setBanner(data);
  }

  useEffect(() => {
    if (!sessionStorage.getItem('banner') || sessionStorage.getItem('banner') === 'show') {
      getBanner();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, []);

  return (
    isOpen && banner &&
    <Box
      p={2}
      mb={5}
      bg={'white'}
      shadow={'0 3px 3px rgba(0,0,0,.15), 0 0 0 rgba(0,0,0,.15)'}
      position="relative"
    >
      <CloseButton
        size={'sm'}
        position="absolute"
        right={1}
        top={1}
        onClick={() => {
          sessionStorage.setItem('banner', 'hide');
          setIsOpen(false);
        }}
      />
      <Text fontWeight={600} fontSize={'1.1em'}>
        <InfoIcon boxSize={5} mr={2} mt={'-1px'} color={'blue.500'} />
        Chollitos.net
      </Text>
      <Text mt={5} dangerouslySetInnerHTML={{ __html: banner?.html }} />
    </Box>
  )
}

export default Banner;