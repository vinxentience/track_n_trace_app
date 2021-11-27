import React, {useState, useEffect } from 'react'
import { InputGroup, InputLeftElement, InputRightElement, Input, Switch, Container, useDisclosure, Image, Button, Grid, Box, Fade, Flex, Heading, Spacer, IconButton, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter} from '@chakra-ui/react';
import { useAuth } from '../../../contexts/AuthContext';
import Sidebar from '../Sidebar/Sidebar';
import { FaUpload, FaSun, FaMoon, FaTh, FaUserCircle, FaMap, FaBirthdayCake, FaEdit} from 'react-icons/fa'
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import firebase from 'firebase/app'
import 'firebase/storage'
import { auth } from '../../../firebase'
import { FaQrcode, FaPrint } from 'react-icons/fa'
import QRCode from 'qrcode'
import ClipLoader from 'react-spinners/HashLoader'
import defaultPicture from '../../../images/defaultprofile.png'
import moment from 'moment'
const Profile = () => {
    const { currentUser } = useAuth()

    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark"
    const formBackground =  useColorModeValue("gray.100", "gray.700")
    const borderColor =  useColorModeValue("black", "var(--chakra-colors-whiteAlpha-300)")
    const iconColor =  useColorModeValue("gray.700", "gray.200")
    const db = firebase.firestore()
    const userUid = auth.currentUser.uid

    const [isSwitched, setIsSwitched] = useState(false)
    const onSwitched = () => setIsSwitched(!isSwitched)

    const [getName, setName] = useState("")
    const [getAddress, setAddress] = useState("")
    const [getBirthdate, setBirthdate] = useState("")

    const { isOpen: isOpenMenu, onToggle } = useDisclosure()
    const { isOpen: isOpenModal, onOpen, onClose } = useDisclosure()
    
    const [getSrc, setSrc] = useState("")

    const [loading, setLoading] = useState(false)

    const [getImage, setImage] = useState(null)
    const [getImageDisplay, setImageDisplay] = useState(defaultPicture)
    const [getUserDisplay, setUserDisplay] = useState(defaultPicture)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 6000)
    }, [])

    function pdfGenerate() {
       
    }

    useEffect(() => {
        QRCode.toDataURL(userUid).then((data) => {
            setSrc(data)
        })

        firebase.storage().ref('users/' + userUid + '/profilepicture.jpg').getDownloadURL().then((imgUrl) => {
            setUserDisplay(imgUrl)
            setImageDisplay(imgUrl)
        })

    }, [userUid])

    db.collection('users').doc(userUid).get().then(doc => {
        setName(doc.data().fname + " " + doc.data().mname + " " + doc.data().lname)
        setAddress(doc.data().address)
        setBirthdate(moment(doc.data().birth_date, 'MM/DD/YYYY').format('LL'))
    })

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
            setImageDisplay(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleUpload = () => {
        firebase.storage().ref('users/' + userUid + '/profilepicture.jpg').put(getImage).then(()=>{
            console.log('uploaded successfully')
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
            {
                loading ?
                <>
                    <Flex width="100%" height="90vh" alignItems="center" justifyContent="center" textAlign="center">
                        <ClipLoader size={50} color={"#008080"} loading={loading}/>
                        <Text fontSize="2xl" textShadow="1px #f0f0f0" ml={5}> Track-n-Trace </Text>    
                    </Flex>
                </>
                :
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
                </Fade >
            </Flex>

            <Container maxW="xl" mt={100} centerContent>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(1, 1fr)", lg: "repeat(1, 1fr)"}} gap={0} w={{ base: "350px", md: "600px", lg: "650px" }}>
                    <Box background="transparent" w="100%" p={5}>
                        <Box>
                        {
                        isSwitched ? 
                        <>
                            <Image src={getImageDisplay} transition="all 0.5s ease-in-out" boxSize={{ base: "200px", md: "250px", lg: "250px" }} borderRadius="full" display="block" marginLeft="auto" marginRight="auto" /> 
                            <input id="actual-btn" type="file" onChange={handleChange} hidden/>
                           
                            <label for="actual-btn" style={{backgroundColor: 'teal', color: 'white', padding: '5px', cursor: 'pointer', borderRadius: '5px', display: 'flex', justifyContent: 'center', marginTop: '5px'}}> <FaUpload color="white" /> <Text ml={5} > Choose File </Text> </label>
                            <Button colorScheme="teal" onClick={handleUpload}> Upload Profile </Button>
                        </>
                        :
                            <Image src={getUserDisplay} transition="all 0.5s ease-in-out" boxSize={{ base: "200px", md: "250px", lg: "250px" }} borderRadius="full" display="block" marginLeft="auto" marginRight="auto" />
                        }  
                        
                        </Box>
                        
                        <Text fontSize={{ base: "20px", md: "25px", lg: "20px" }} textAlign="center">
                            {currentUser.email}
                        </Text>
                    </Box>

                    <Box display="flex" justifyContent="center">
                        <Switch colorScheme="teal" size="lg" mr={5} onChange={onSwitched}/> Edit Mode
                    </Box>

                    <Flex justifyContent="center" textAlign="center" border="1px" mt={5} padding={2} borderRadius={10} borderColor={borderColor} boxShadow="2xl">
                    <Box ml="3">
                        <Text fontWeight="bold">
                            Full Name
                        </Text>
                        
                        {
                        
                        isSwitched ?  

                                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents="none"
                                    color={iconColor}
                                    fontSize="1.5em"
                                    children={<FaUserCircle color="green.500" />}
                                    />
                                    <Input variant="flushed" defaultValue={getName} />
                                    <InputRightElement children={<FaEdit color="green.500" />} />
                                </InputGroup> 

                                : 

                        <Text fontSize="md"> {getName} </Text> 
                        
                        }
                        
                    </Box>
                    </Flex>

                    <Flex justifyContent="center" textAlign="center" border="1px" mt={5} padding={2} borderRadius={10} borderColor={borderColor} boxShadow="2xl">
                    <Box ml="3">
                        <Text fontWeight="bold">
                            Address
                        </Text>
                        {
                        
                        isSwitched ?  

                                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents="none"
                                    color={iconColor}
                                    fontSize="1.5em"
                                    children={<FaMap color="green.500" />}
                                    />
                                    <Input variant="flushed" defaultValue={getAddress} />
                                    <InputRightElement children={<FaEdit color="green.500" />} />
                                </InputGroup> 

                                : 

                        <Text fontSize="md"> {getAddress} </Text> 
                        
                        }
                    </Box>
                    </Flex>

                    <Flex border="1px" justifyContent="center" textAlign="center" mt={5} mb={5} padding={2} borderRadius={10} borderColor={borderColor} boxShadow="2xl">
                    <Box ml="3">
                        <Text fontWeight="bold">
                            Date of Birth
                        </Text>
                        {
                        
                        isSwitched ?  

                                <InputGroup>
                                    <InputLeftElement
                                    pointerEvents="none"
                                    color={iconColor}
                                    fontSize="1.5em"
                                    children={<FaBirthdayCake color="green.500" />}
                                    />
                                    <Input variant="flushed" defaultValue={getBirthdate} />
                                    <InputRightElement children={<FaEdit color="green.500" />} />
                                </InputGroup> 

                                : 

                        <Text fontSize="md"> {getBirthdate} </Text> 
                        
                        }
                    </Box>
                    </Flex>

                </Grid>
                <Button colorScheme="teal" mb={5} leftIcon={<FaQrcode />} onClick={onOpen}>View QR Code</Button>
                <Modal onClose={onClose} isOpen={isOpenModal} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Track-n-Trace Card</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <Grid templateColumns="repeat(2, 1fr)">
                            <Box w="100%"> 
                                <Image src={getSrc} alt="QR Code" rounded="10px" size="lg"/>
                            </Box>
                            <Box w="100%"> 
                                <Text fontSize="15px">
                                Fullname: {getName}
                                </Text>

                                <Text fontSize="15px">
                                    Address: {getAddress}
                                </Text>

                                <Text fontSize="15px">
                                    Date of Birth: {getBirthdate}
                                </Text> 
                            </Box> 
                        </Grid>
                            
                        </ModalBody>
                        <ModalFooter>
                            <Button leftIcon={<FaPrint />} colorScheme="teal" mr={2} onClick={pdfGenerate}> Print </Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>        

            </Container>
            </>
            }
            
            
            </>
            
    )
}

export default Profile
