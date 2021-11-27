import React, { useRef, useState } from "react"
import { Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Flex, VStack, Heading } from '@chakra-ui/layout'
import { IconButton } from "@chakra-ui/button"
import { FaSun, FaMoon } from 'react-icons/fa'
import { useColorMode, useColorModeValue } from "@chakra-ui/color-mode"
import { Spacer, Button, Input } from "@chakra-ui/react"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark"
    const formBackground =  useColorModeValue("gray.100", "gray.700")

    async function handleSubmit(e) {
        e.preventDefault()
        
        try{
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for furthur instructions.')
        } catch {
            setError('Failed to reset password.')
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

          <Flex height="80vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background={formBackground} p={12} rounded={6}>
                    <Heading mb={6}> Password Reset </Heading>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Input type="email" ref={emailRef} required />
                        </Form.Group>
                        <br />
                        <Button colorScheme="teal" disabled={loading} className="w-100" type="submit">
                        Reset Password
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3"> 
                        <Link to='/login'> Log in </Link> <br />
                        Doesn't have an account? <Link to="/signup"> Sign up </Link>
                    </div>
                </Flex>
            </Flex>
        </VStack>
    )
}
