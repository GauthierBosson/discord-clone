import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useHistory } from "react-router-dom";
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

import { useAuth } from "../hooks/useAuth";

const Signup = (): JSX.Element => {
  const history = useHistory()
  const auth = useAuth()

  return (
    <SimpleGrid h="100vh" w="100%" placeItems="center" bgColor="discordGrey.400">
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, actions) => {
          const { email, password, username } = values
          try {
            await auth.signup(email, password, username)
            history.push('/')
          } catch (error) {
            actions.setSubmitting(false)
            console.log(error)
          }
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

            <Field name="username">
              {({ form, field }: { form: any; field: any }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Nom dutilisateur</FormLabel>
                  <Input
                    {...field}
                    id="username"
                    type="text"
                    placeholder="Nom d'utilisateur"
                  />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
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

            <Field name="confirmPassword">
              {({ form, field }: { form: any; field: any }) => (
                <FormControl
                  isInvalid={
                    form.errors.confirmPassword && form.touched.confirmPassword
                  }
                >
                  <FormLabel htmlFor="confirmPassword">
                    Confirmation du mot de passe
                  </FormLabel>
                  <Input
                    {...field}
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirmation du mot de passe"
                  />
                  <FormErrorMessage>{form.errors.confirmPassword}</FormErrorMessage>
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
          </VStack>
        )}
      </Formik>
    </SimpleGrid>
  )
}

export default Signup
