import {
  Box,
  Flex,
  Button,
  Spacer,
  Icon,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const CreateOrUpdateStore = ({id = 0}) => {
  

  // return (
  //   <Modal isOpen={isChangePWD} onClose={() => setIsChangePWD(false)}>
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader>{t(_t('Change Password'))}</ModalHeader>
  //       <ModalCloseButton />
  //       <form onSubmit={handleChangePassword}>
  //         <ModalBody>
  //           <FormControl mt={5} isRequired>
  //             <FormLabel>{t(_t('Current Password'))}</FormLabel>
  //             <Input type="password" value={oldPWD} onChange={(e) => { setOldPWD(e.target.value) }} />
  //           </FormControl>
  //           <FormControl mt={5} isRequired>
  //             <FormLabel>{t(_t('New Password'))}</FormLabel>
  //             <Input type="password" value={newPWD} onChange={(e) => { setNewPWD(e.target.value) }} />
  //           </FormControl>
  //           <FormControl mt={5} isRequired isInvalid={confirmPWD !== newPWD}>
  //             <FormLabel>{t(_t('Confirm Password'))}</FormLabel>
  //             <Input type="password" value={confirmPWD} onChange={(e) => { setConfirmPWD(e.target.value) }} />
  //           </FormControl>
  //         </ModalBody>
  //         <ModalFooter>
  //           <Button type="submit" colorScheme="blue" mr={3}>Save</Button>
  //           <Button onClick={() => setIsChangePWD(false)}>Cancel</Button>
  //         </ModalFooter>
  //       </form>
  //     </ModalContent>
  //   </Modal>
  // )
}

export default CreateOrUpdateStore;