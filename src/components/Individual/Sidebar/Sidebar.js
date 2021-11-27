import React, { useState, useEffect, useRef } from 'react'
import { Flex, Heading } from '@chakra-ui/layout'
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button, Avatar, Divider, IconButton, Spacer, Text, Alert } from '@chakra-ui/react'
import { FaHome, FaChartPie, FaSearchLocation, FaQrcode } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import NavItem from './NavItem'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext'
import { auth } from '../../../firebase'
import { useColorModeValue } from "@chakra-ui/color-mode"
import 'firebase/storage'
import firebase from 'firebase/app'
import defaultPicture from '../../../images/defaultprofile.png'

export default function Sidebar({ userName, visibility }) {
    const [navSize, changeNavSize] = useState("small")
    const [error, setError] = useState('')
    const [getUserDisplay, setUserDisplay] = useState(defaultPicture)
    const [getFname, setFname] = useState("")
    const [getDisplay, setDisplay] = useState('')
    const { logout } = useAuth()
    const userUid = auth.currentUser.uid
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const history = useHistory()
    const formBackground =  useColorModeValue("gray.100", "gray.700")
    const db = firebase.firestore()

    async function handleLogout(){
        setError('')
        try{
            await logout()
            history.push('/')
        }catch{
            setError('Failed to Logout')
        }
    }
    
    useEffect(() => {
        if(visibility){
            setDisplay('block')
        } else {
            setDisplay('none')
        }
    }, [visibility])

    useEffect(() => {
        firebase.storage().ref('users/' + userUid + '/profilepicture.jpg').getDownloadURL().then((imgUrl) => {
            setUserDisplay(imgUrl)
        })

        db.collection('users').doc(userUid).get().then(doc => {
            setFname(doc.data().fname)
        })
    }, [userUid, db])


    
    return (
        <>
        <Flex display={getDisplay} overflow="none" pos="fixed" right="3" marginTop="8vh" borderRadius={navSize === "small" ? "15px" : "30px"} boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)" w={navSize === "small" ? "75px" : "200px"} flexDir="column" justifyContent="space-between" bgColor={formBackground}>
            <Flex overflow="none" p="5%" flexDir="column" alignItems={navSize === "small" ? "center" : "flex-start"} as="nav">
                <IconButton background="none" mt={5} _hover={{background: 'none'}} icon={navSize === "small" ? <FaArrowLeft />: <FaArrowRight />} onClick={()=>{
                    if(navSize === "small") changeNavSize("large")
                    else changeNavSize("small")
                }}/>
                
                <Link to="/individual/dashboard"><NavItem navSize={navSize} iconItems={FaHome} title="Dashboard" description=""/></Link>
                <Link to="/individual/covidtracker"><NavItem navSize={navSize} iconItems={FaChartPie} title="COVID-19 Stats"/></Link>
                <NavItem navSize={navSize} iconItems={FaSearchLocation} title="Track Path"/>
                <Link to="/individual/scan-qr"><NavItem navSize={navSize} iconItems={FaQrcode} title="Scan QR" description=""/></Link>
                <Flex onClick={() => setIsOpen(true)}> <NavItem navSize={navSize} iconItems={FiLogOut} title="Logout"/> </Flex>
            </Flex>
            <Spacer />
            {error && <Alert variant="danger">{error}</Alert>}
            <Flex p="5%" flexDir="column" w="100%" alignItems={navSize === "small" ? "center" : "flex-start"} mb={4}>
                <Divider display={navSize === "small" ? "none" : "flex"}/>
                <Flex mt={4} align="center">
                    <Link to="/individual/profile">
                    <Avatar src={getUserDisplay} size="sm" />
                    </Link>
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                    <Link to="/individual/profile">
                        <Heading as="h3" size="sm"> {getFname} </Heading>
                        <Text color="gray"> Individual </Text>
                    </Link>
                    </Flex>
                    
                </Flex>
            </Flex>
        </Flex>

        <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        >
        <AlertDialogOverlay>
        <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Logout
            </AlertDialogHeader>

            <AlertDialogBody>
                Are you sure you want to logout? Please confirm.
            </AlertDialogBody>

            <AlertDialogFooter>
            <Button colorScheme="red" onClick={handleLogout}>
                Logout
            </Button>
            <Button ref={cancelRef} onClick={onClose} ml={3}>
                Cancel
            </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog>
        </>
    )
}
