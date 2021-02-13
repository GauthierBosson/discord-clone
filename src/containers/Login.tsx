import React from 'react'
import { Formik, Form, Field } from 'formik'
import { Link } from "react-router-dom";
import {
  SimpleGrid,
  Text,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'

const Login = (): JSX.Element => {
  return (
    <SimpleGrid h="100vh" w="100%" placeItems="center" bgColor="discordGrey.400">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={async (values) => {
          console.log(values)
        }}
      >
        {(props) => (
          <VStack
            as={Form}
            spacing={4}
            rounded="sm"
            w="390px"
            p={6}
            bgColor="discordGrey.200"
          >
            <Text fontSize="3xl" as="h1">
              Créer un compte
            </Text>
            <Field name="email">
              {({ form, field }: { form: any; field: any }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" type="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ form, field }: { form: any; field: any }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Mot de passe</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Mot de passe"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              isLoading={props.isSubmitting}
              color="white"
              bgColor="discordPurple.100"
              w="100%"
            >
              Continuer
            </Button>
            <Link to="/signup">Ou inscrivez-vous</Link>
          </VStack>
        )}
      </Formik>
    </SimpleGrid>
  )
}

export default Login
