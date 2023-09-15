import { useState, useEffect } from "react";
import { Text, CloseButton, Box } from "@chakra-ui/react";
import { getBannerService } from "../../Services/Banner";
import { InfoIcon } from "@chakra-ui/icons";

const Banner = () => {
  // const [isOpen, setIsOpen] = useState(sessionStorage.getItem('banner') === 'show');
  const [isOpen, setIsOpen] = useState(false);
  const [banner, setBanner] = useState(null);

  const getBanner = async () => {
    const data = await getBannerService();
    setBanner(data);
  }

  useEffect(() => {
    if (sessionStorage.getItem('banner') === 'hide') {
      setIsOpen(false);
    } else {
      getBanner();
      setIsOpen(true);
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
      <iframe
        srcDoc={banner?.content}
        width='100%'
        height="100%"
      />
    </Box>
  )
}

export default Banner;