// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
    // const currentUser = request.cookies.get('session')?.value;
    // console.log(currentUser)

    if (request.cookies.has('session')) {
        return NextResponse.redirect(new URL('/home/homepage', request.url));
    }

   

    if (!request.cookies.has('session') && request.nextUrl.pathname == '/') {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }



     return NextResponse.next();
    // if (currentUser && (request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/')) {
    //     console.log('2')

    //     return NextResponse.redirect(new URL('/home/pastfyptopics', request.url));
    // }

    // return NextResponse.next();
}

export const config = {
    matcher: ["/", "/sign-in"],
};


// export const uploadMiddleware = upload.single('file');

// export function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }
//       return resolve(result);
//     });
//   });
// }
