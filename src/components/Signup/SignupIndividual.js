import React, { useRef, useState  } from "react"
import { Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Flex, VStack, Heading } from '@chakra-ui/layout'
import { IconButton } from "@chakra-ui/button"
import { FaSun, FaMoon } from 'react-icons/fa'
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Spacer, Button, Input } from "@chakra-ui/react"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

export default function SignupIndividual() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const fnameRef = useRef()
    const mnameRef = useRef()
    const lnameRef = useRef()
    const addressRef = useRef()
    const passwordConfirmRef = useRef()
    const { signupIndiv } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [getInputDate, setInputDate] = useState(null)

    const history = useHistory()
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark"
    const formBackground =  useColorModeValue("gray.100", "gray.700")

    const handleDateChange = (date, value) => {
        setSelectedDate(date)
        setInputDate(value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords does not match')
        }
        
        try{
            setError('')
            setLoading(true)
            await signupIndiv(emailRef.current.value, passwordRef.current.value, fnameRef.current.value, lnameRef.current.value, mnameRef.current.value, getInputDate, addressRef.current.value)
            history.push('/');
        } catch {
            setError('Failed to create an account.')
        }
            setLoading(false)
    }
    return (
        <VStack p={5}>
          <Flex w="100%">
            <Heading size="lg" fontWeight="semibold" color="cyan.400"> 
              Track-n-Trace
            </Heading>
            <Spacer></Spacer>
            <IconButton ml={8} icon={isDark ? <FaSun /> : <FaMoon />} isRound="true" onClick={toggleColorMode}></IconButton>
            </Flex>
            <Flex height="120vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background={formBackground} p={12} rounded={6}>
                    <Heading mb={6} textAlign="center"> Sign Up </Heading>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Input variant="flushed" type="email" ref={emailRef} placeholder="Enter your email here..." required />
                        </Form.Group>

                        <Form.Group id="fname">
                        <Form.Label>First Name</Form.Label>
                        <Input variant="flushed" type="text" ref={fnameRef} placeholder="Enter your first name here..." required />
                        </Form.Group>
                        
                        <Form.Group id="mname">
                        <Form.Label>Middle Name</Form.Label>
                        <Input variant="flushed" type="text" ref={mnameRef} placeholder="Enter your middle name here..." required />
                        </Form.Group>

                        <Form.Group id="lname">
                        <Form.Label>Last Name</Form.Label>
                        <Input variant="flushed" type="text" ref={lnameRef} placeholder="Enter your last name here..." required />
                        </Form.Group>


                        <Form.Group id="dob">
                        <Form.Label>Date of Birth</Form.Label>
                        
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                                disableFuture
                                required
                                margin="normal"
                                value={selectedDate}
                                onChange={handleDateChange}
                                format="MM/DD/YYYY"
                                id="date-picker"
                                animateYearScrolling
                            />
                        
                        </MuiPickersUtilsProvider>
                        
                        </Form.Group>

                        <Form.Group id="address">
                        <Form.Label>Address</Form.Label>
                        <Input variant="flushed" type="text" ref={addressRef} placeholder="Enter your complete address here..." autoComplete="off" required />
                        </Form.Group>

                        <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Input variant="flushed" type="password" ref={passwordRef} placeholder="Enter your password here..." required />
                        </Form.Group>

                        <Form.Group id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Input variant="flushed" type="password" ref={passwordConfirmRef} placeholder="Please Confirm your Password..." required />
                        </Form.Group> <br />

                        <Button colorScheme="teal" disabled={loading} className="w-100" type="submit"> Sign Up </Button>
                    </Form>
                    <div className="w-100 text-center mt-3"> 
                        <Link to="/login"> Already have an account? </Link>
                    </div>
                </Flex>
            </Flex>
      </VStack>
    )
}
