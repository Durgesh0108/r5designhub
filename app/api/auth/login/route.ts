import prismadb from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
// import bcrypt from 'bcryptjs'

// export async function POST(req: Request) {
//     try {
//       const body = await req.json();

//       const { name } = body;
//       console.log(body);
//     //   console.log(name);
//     //   console.log("from Backend");

//     //   const category = await prismadb.category.create({
//     //       data: {
//     //           name: name,
//     //       },
//     //   })
//       return NextResponse.json(body);
//     } catch (error) {
//       return new NextResponse("Internal Error", { status: 500 });
//     }
//   }

//   exports.signup = async (req: Request) => {
//     const data = await req.json();

//     const newUser = await User.create({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         passwordConfirm: req.body.passwordConfirm,
//         passwordChangedAt: req.body.passwordChangedAt,
//         role: req.body.role
//     });
//     const url = `${req.protocol}://${req.get('host')}/me`;
//     // console.log(url);
//     await new Email(newUser, url).sendWelcome();
//     createSendToken(newUser, 201, res);
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // Find user by email
    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return new NextResponse("User not found");
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new NextResponse("Invalid credentials");
    }

    // // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
    cookies().set("token", token);

    // res.json({ token });
    return NextResponse.json({ user, token });
  } catch (error) {
    console.error("Login error:", error);
    return new NextResponse("Login failed");
  }
}
