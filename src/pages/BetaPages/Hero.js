import {
  Heading,
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  useToast,
  Text,
  useColorMode,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import supabase from '../../supabase';
import { useState } from 'react';

const Hero = () => {
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [inputEmail, setEmail] = useState('');

  const submitForm = async event => {
    // checks whether the email is already in the database
    try {
      let { data: betaSignUp, error } = await supabase
        .from('betaSignUp')
        .select()
        .eq('email', inputEmail);
      
      if (betaSignUp.length > 0) {
        return toast({
          title: 'You are already signed up 🚀',
          description: 'Thank you for contacting us!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        const { data, error } = await supabase
          .from('betaSignUp')
          .insert([{ email: inputEmail }]);
        
        console.log(error);
        return toast({
          title: 'Message sent!🚀',
          description: 'Thank you for contacting us!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box padding="50">
      <Heading
        fontWeight="extrabold"
        fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        bg={colorMode === 'dark' ? 'white' : 'gray.700'}
        bgClip="text"
      >
        IMPROVE YOUR WORK ETHIC WITH
      </Heading>

      <Heading
        fontWeight="extrabold"
        bgGradient="linear(to-l, teal.300, blue.500)"
        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
        bgClip="text"
      >
        GoalTac
      </Heading>
      <FormControl
        marginTop="200"
        width={{ base: '100%', sm: '100%', md: '50%' }}
      >
        <Flex flexDirection="row" textAlign="center" alignItems="center">
          <Input
            id="email"
            type="email"
            placeholder=" Email Address "
            border="1px"
            borderRadius="2"
            marginRight="5"
            padding="3"
            _placeholder={{ color: 'inherit' }}
            value={inputEmail}
            onChange={event => setEmail(event.target.value)}
          />
          <Button
            borderRadius={5}
            width="30%"
            type="submit"
            fontSize="xs"
            border="1px"
            variant="solid"
            onClick={submitForm}
          >
            Sign Up
          </Button>
        </Flex>
        <Text color={colorMode === 'dark' ? 'white' : 'gray.700'} padding="3">
          Sign up for a chance to be selected for exclusive access! <br />
          <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            Learn more
          </Button>
        </Text>
      </FormControl>
    </Box>
  );
};

export default Hero;
