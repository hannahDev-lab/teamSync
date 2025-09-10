import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'
import { SignUpDto, LoginDto } from './dto'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password, name } = signUpDto
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    const { password: _, ...result } = user
    return result
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await this.prisma.user.findUnique({ where: { email } })

    if (!user) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다.')
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password)

    if (!isPasswordMatching) {
      throw new UnauthorizedException('인증 정보가 유효하지 않습니다.')
    }

    const payload = { email: user.email, sub: user.id }
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
