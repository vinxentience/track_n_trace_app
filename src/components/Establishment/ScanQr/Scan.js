import React, {useRef, useState, useEffect } from 'react'
import { Alert, AlertIcon, Switch, Avatar, Container, useDisclosure, Button, Grid, Box, Fade, Flex, Heading, Spacer, IconButton, Text, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { useAuth } from '../../../contexts/AuthContext';
import Sidebar from '../Sidebar/Sidebar';
import { FaTh } from 'react-icons/fa'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import firebase from 'firebase/app'
import QrReader from 'react-qr-reader'
import moment from 'moment'
import defaultPicture from '../../../images/defaultprofile.png'

const Scan = () => {

    const { currentUser } = useAuth()
    

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark"
    const formBackground =  useColorModeValue("gray.100", "gray.700")
    const borderColor =  useColorModeValue("black", "var(--chakra-colors-whiteAlpha-300)")
    const db = firebase.firestore()

    const [isOpen, setIsOpen] = useState(false)
    const [isSwitched, setIsSwitched] = useState(false)
    const onClose = () => setIsOpen(false)
    const onSwitched = () => setIsSwitched(!isSwitched)
    const cancelRef = useRef()
    

    const { isOpen: isOpenMenu, onToggle } = useDisclosure()

    const [getScanedId, setScanedId] = useState("")
    const [getName, setName] = useState("")
    const [getAddress, setAddress] = useState("")
    const [getBirthdate, setBirthdate] = useState("")
    const [getDateTime, setDateTime] = useState("")
    const [getUserDisplay, setUserDisplay] = useState(defaultPicture)

    const handleErrorQr = (error) => {
        console.log(error);
    }

    const handleScanFile = (result) => {
        if(result){
            db.collection('users').doc(result).get().then(doc => {
                if(doc.data().role === "Individual"){
                    setName(doc.data().fname + " " + doc.data().mname + " " + doc.data().lname)
                    setAddress(doc.data().address)
                    setBirthdate(doc.data().birth_date)
                    setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'))
                    setIsOpen(true)
                    setScanedId(result)
                } else { 
                    setIsOpen(false)
                    alert("This is not a registered individual.")
                   
                }
            })
        }
    }

    useEffect(() => {
        if(getScanedId !== null && getScanedId !== ''){
            firebase.storage().ref('users/' + getScanedId + '/profilepicture.jpg').getDownloadURL().then((imgUrl) => {
                setUserDisplay(imgUrl)
            })
        } 
    }, [getScanedId])

    const closeDialog = () => {
        setIsOpen(false)
        setAddress(null)
        setName(null)
        setBirthdate(null)
        setDateTime(null)
        setUserDisplay(defaultPicture)
    }

    const confirmDialog = () => {
        setIsOpen(false)
        db.collection('tracker').doc(getScanedId).collection('places').add({
            IndividualID: getScanedId,
            EstablishmentID: currentUser.uid,
            DateVisit: getDateTime
        })

    }



    return (
        <>

        
        <Flex w="100%" p="3" pos="fixed" zIndex="99" background={formBackground} top="0">
                <Box>
                    <Heading size="lg" fontWeight="semibold" mt="1.5" color="teal.500"> Track-n-Trace </Heading>
                </Box>
                <Spacer />
                <Box>
                    <IconButton bgColor="transparent" mr="1" icon={isDark ? <FaSun /> : <FaMoon />} onClick={toggleColorMode} h="45px" w="45px">
                    Sign Up
                    </IconButton>
                    <Button borderRadius="10px" bgColor="teal.500" _hover={{background: 'teal.400'}} h="45px" w="45px" onClick={onToggle}><FaTh /></Button>
                </Box>
                <Fade in={isOpenMenu}>
                    <Sidebar visibility={isOpenMenu} userName={currentUser.email}/>
                </Fade>
            </Flex>

            <Container maxW="xl" mt={100} centerContent>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)", lg: "repeat(1, 1fr)"}} gap={0} w={{ base: "400px", md: "400px", lg: "400px" }}>
                    <Box background="transparent" w="100%" p={5} display="flex" justifyContent="center" alignContent="center">
                        <Box>
                            {isSwitched ? <QrReader delay={300} style={{width: '300px', height: '300px'}} onError={handleErrorQr} onScan={handleScanFile} /> : <Alert status="warning"><AlertIcon />Camera is Disabled. </Alert> }
                        </Box>
                        
                    </Box>
                    <Box display="flex" justifyContent="center" alignContent="center">
                    <Switch colorScheme="teal" size="lg" onChange={onSwitched}/>
                    </Box>
                    <Box background="transparent" w="100%" p={5}>
                    
                    <Flex border="1px" padding={2} borderRadius={10} borderColor={borderColor} boxShadow="2xl">
                    <Avatar src={getUserDisplay} />
                    <Box ml="3">
                        <Text fontWeight="bold">
                        Individual Name
                        </Text>
                        <Text fontSize="sm">{getName}</Text>
                    </Box>
                    </Flex>

                    <Flex border="1px" padding={2} mt={5} borderRadius={10} borderColor={borderColor} boxShadow="2xl">
                    <Box ml="3">
                        <Text fontWeight="bold">
                        Address
                        </Text>
                        <Text fontSize="sm">{getAddress}</Text>
                    </Box>
                    </Flex>

                    <Flex border="1px" padding={2} mt={5} borderRadius={10} borderColor={borderColor} boxShadow="2xl">
                    <Box ml="3">
                        <Text fontWeight="bold">
                        Date of Birth
                        </Text>
                        <Text fontSize="sm">{getBirthdate}</Text>
                    </Box>
                    </Flex>

                    <Flex border="1px" padding={2} mt={5} borderRadius={10} borderColor={borderColor} boxShadow="2xl">
                    <Box ml="3">
                        <Text fontWeight="bold">
                        Date and Time Scanned
                        </Text>
                        <Text fontSize="sm">{getDateTime}</Text>
                    </Box>
                    </Flex>
                    </Box>
                </Grid>
                </Container>
                

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirmation
            </AlertDialogHeader>

            <AlertDialogBody>
              Is {getName} going inside the establishment? Please kindly confirm.
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button colorScheme="green" onClick={confirmDialog} mr={3}>
                Yes
              </Button>

              <Button colorScheme="red" ref={cancelRef} onClick={closeDialog}>
                No
              </Button>
              
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
        </>
    )
}

export default Scan
