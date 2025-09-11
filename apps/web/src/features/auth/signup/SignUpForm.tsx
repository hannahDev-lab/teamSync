'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

const formSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식을 입력해주세요.' }),
  name: z.string().min(2, { message: '이름은 2글자 이상이어야 합니다.' }),
  password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }),
})

export function SignUpForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  })

  const signUpMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      apiClient.post('/auth/signup', data),
    onSuccess: () => {
      alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.')
      router.push('/login')
    },
    onError: error => {
      console.error('회원가입 실패:', error)
      alert('회원가입에 실패했습니다')
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    signUpMutation.mutate(values)
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">회원가입</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="test@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이름</FormLabel>
                  <FormControl>
                    <Input placeholder="김보라" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={signUpMutation.isPending}
            >
              {signUpMutation.isPending ? '가입하는 중...' : '가입하기'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
