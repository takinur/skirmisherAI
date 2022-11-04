import React from 'react'
import GuestLayout from './Layout/Guest'

import ScrollToTop from '../components/ScrollToTop'
import { useTitle } from '../hooks/useTitle'

const HomePage = () => {
  useTitle('Welcome to Job Portal')

  return (
    <GuestLayout>
      <ScrollToTop />

      <div className="hero-section bg-primary-gradient relative min-h-screen py-28">
        <div className="container mx-auto gap-4 px-8 md:flex">
          <div className="image-section md:flex-1">
            <div className="image-container relative flex h-full w-full justify-center ">
              <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-y-1/2 -translate-x-1/2  bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-400 to-indigo-600 blur-3xl "></div>
              <img
                className="w-max-[320px] z-10  w-[320px] "
                src="https://vitejs.dev/logo-with-shadow.png"
                alt="Vite Logo"
              />
            </div>
          </div>
          <div className="main mt-4 grid grid-flow-row gap-2 md:order-first md:mt-0 md:flex-1 md:pl-20">
            <h1 className="text-primary-gradient  mx-auto text-5xl font-bold md:mx-0 md:mt-12 md:text-6xl">
              SkirmisherAI
            </h1>
            <p className="mx-auto mt-2 pr-4 pl-6 font-roboto text-2xl text-gray-300 md:mx-0 md:pl-0">
              A platform that helps employers to find the right talent for their organization and
              helps job seekers to find the right job for them.
            </p>
          </div>
        </div>

        <div className="container mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:px-12 2xl:px-32">
          <div className="mx-4 flex h-44 content-center items-center rounded-md bg-gray-700 px-2 ">
            <div className="icons ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-20 w-20 text-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                />
              </svg>
            </div>
            <div className="content-wrapper ml-6">
              <h2 className="mt-1 font-roboto text-3xl text-indigo-300">
                Most Demand Job Categories
              </h2>
              <p id="numberAnimate" className=" mt-4 font-roboto text-base text-slate-300">
                10,000+ Jobs Posted
              </p>
            </div>
          </div>
          <div className="mx-4 flex h-44 content-center items-center rounded-md bg-gray-700 px-2 ">
            <div className="icons ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-20 w-20 text-slate-300"
              >
                <path d="M6 3v12"></path>
                <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path d="M15 6a9 9 0 0 0-9 9"></path>
                <path d="M18 15v6"></path>
                <path d="M21 18h-6"></path>
              </svg>
            </div>
            <div className="content-wrapper ml-6">
              <h2 className="mt-1 font-roboto text-3xl text-indigo-300">Equitable Hiring</h2>
              <p className="mt-4 font-roboto text-base text-slate-300">
                Enables recruiter to focus only on skills
              </p>
            </div>
          </div>
          <div className="mx-4 flex h-44 content-center items-center rounded-md bg-gray-700 px-2 ">
            <div className="icons ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-20 w-20 text-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"
                />
              </svg>
            </div>
            <div className="content-wrapper ml-6">
              <h2 className="mt-1 font-roboto text-3xl text-indigo-300">
                Delightful User Experience
              </h2>
              <p className="mt-4 font-roboto text-base text-slate-300">
                Easy to use and understand for both recruiters and job seekers
              </p>
            </div>
          </div>
          <div className="mx-4 flex h-44 content-center items-center rounded-md bg-gray-700 px-2 ">
            <div className="icons ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="h-20 w-20 text-slate-300"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"></path>
                <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"></path>
                <path d="M6 6h.01"></path>
                <path d="M6 18h.01"></path>
                <path d="m13 6-4 6h6l-4 6"></path>
              </svg>
            </div>
            <div className="content-wrapper ml-6">
              <h2 className="mt-1 font-roboto text-3xl text-indigo-300">
                Quick setup & onboarding
              </h2>
              <p className="mt-4 font-roboto text-base text-slate-300">
                Fast, tidy, adn efficient onboarding process
              </p>
            </div>
          </div>
          <div className="mx-4 flex h-44 content-center items-center rounded-md bg-gray-700 px-2 ">
            <div className="icons ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-20 w-20 text-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                />
              </svg>
            </div>
            <div className="content-wrapper ml-6">
              <h2 className="mt-1 font-roboto text-3xl text-indigo-300">Predictive Analytics</h2>
              <p className="mt-4 font-roboto text-base text-slate-300">
                Get hiring process insights for data-driven decisions
              </p>
            </div>
          </div>
          <div className="mx-4 flex h-44 content-center items-center rounded-md bg-gray-700 px-2 ">
            <div className="icons ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-20 w-20 text-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                />
              </svg>
            </div>
            <div className="content-wrapper ml-6">
              <h2 className="mt-1 font-roboto text-3xl text-indigo-300 lg:text-2xl 2xl:text-3xl">
                Exceptional customer support
              </h2>
              <p className="mt-4 font-roboto text-base text-slate-300">
                Our outstanding customer support team is always ready to help
              </p>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center font-mono text-5xl text-green-600">HomePage</h1>
      <div className="main">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci mi, venenatis ac nisl
        vel, porta consequat augue. In quis nulla odio. Integer vel tristique nisl. Vivamus sed urna
        ligula. Nullam in orci lacus. Maecenas eget nulla ut ex gravida gravida id non odio.
        Curabitur lacus erat, egestas ac nisl ut, lacinia scelerisque massa. Nam viverra ligula
        nunc, vel venenatis eros hendrerit eget. Curabitur posuere semper sem ut tincidunt. Donec
        turpis velit, viverra sed tempor eu, dapibus non eros. Ut in finibus leo. Maecenas sit amet
        varius felis. Ut massa eros, porta in tempus et, porttitor a turpis. Aliquam erat volutpat.
        Etiam pellentesque sagittis massa, eu pellentesque ipsum. Aenean euismod tristique neque,
        vitae pharetra tortor vestibulum interdum. Phasellus id augue ante. Sed porta sit amet lacus
        sit amet laoreet. Fusce ut lorem dolor. Donec placerat orci nibh, vel tincidunt lacus
        lacinia quis. Nullam sem leo, interdum in justo ut, elementum sodales felis. In ac dolor
        sem. Cras eget erat tortor. Phasellus justo metus, mollis ut tincidunt gravida, sodales at
        nulla. Fusce in neque neque. Proin non pretium odio, id mattis lorem. Ut quis dolor purus.
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet purus in fringilla
        luctus. Aenean sollicitudin ex nec facilisis molestie. Donec non nibh mattis, maximus eros
        in, cursus purus. Curabitur accumsan quam vitae sapien ultricies dapibus. In scelerisque
        gravida lectus, sed tristique leo tempor ut. Suspendisse molestie et metus vitae posuere.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
        Donec eget sapien diam. Proin tempor suscipit leo, vitae tempor velit posuere hendrerit. Nam
        a odio molestie lacus vehicula semper sit amet eget lacus. Pellentesque nisl purus,
        ultricies ac risus ut, facilisis sagittis purus. Mauris tincidunt suscipit erat, id rutrum
        ipsum posuere nec. Pellentesque fringilla, eros interdum eleifend aliquet, lacus libero
        egestas lorem, in maximus mi tortor id augue. Vivamus rhoncus convallis ipsum, at varius
        nisl cursus a. Quisque hendrerit nisl quis sapien posuere, vel vulputate magna interdum. In
        dignissim, est condimentum consequat luctus, nisl leo ultricies risus, in consectetur lacus
        tellus quis augue. Vivamus euismod interdum turpis, a tempus erat tincidunt et. Phasellus
        luctus volutpat tempor. Integer nec bibendum lacus. Sed id ultricies risus. Proin porta
        luctus tellus nec porttitor. Curabitur massa magna, ornare in dui sit amet, lacinia faucibus
        diam. Nulla tempor accumsan velit vel viverra. Mauris sit amet nulla vel tortor mollis
        lacinia nec at diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci
        mi, venenatis ac nisl vel, porta consequat augue. In quis nulla odio. Integer vel tristique
        nisl. Vivamus sed urna ligula. Nullam in orci lacus. Maecenas eget nulla ut ex gravida
        gravida id non odio. Curabitur lacus erat, egestas ac nisl ut, lacinia scelerisque massa.
        Nam viverra ligula nunc, vel venenatis eros hendrerit eget. Curabitur posuere semper sem ut
        tincidunt. Donec turpis velit, viverra sed tempor eu, dapibus non eros. Ut in finibus leo.
        Maecenas sit amet varius felis. Ut massa eros, porta in tempus et, porttitor a turpis.
        Aliquam erat volutpat. Etiam pellentesque sagittis massa, eu pellentesque ipsum. Aenean
        euismod tristique neque, vitae pharetra tortor vestibulum interdum. Phasellus id augue ante.
        Sed porta sit amet lacus sit amet laoreet. Fusce ut lorem dolor. Donec placerat orci nibh,
        vel tincidunt lacus lacinia quis. Nullam sem leo, interdum in justo ut, elementum sodales
        felis. In ac dolor sem. Cras eget erat tortor. Phasellus justo metus, mollis ut tincidunt
        gravida, sodales at nulla. Fusce in neque neque. Proin non pretium odio, id mattis lorem. Ut
        quis dolor purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet
        purus in fringilla luctus. Aenean sollicitudin ex nec facilisis molestie. Donec non nibh
        mattis, maximus eros in, cursus purus. Curabitur accumsan quam vitae sapien ultricies
        dapibus. In scelerisque gravida lectus, sed tristique leo tempor ut. Suspendisse molestie et
        metus vitae posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia curae; Donec eget sapien diam. Proin tempor suscipit leo, vitae tempor velit
        posuere hendrerit. Nam a odio molestie lacus vehicula semper sit amet eget lacus.
        Pellentesque nisl purus, ultricies ac risus ut, facilisis sagittis purus. Mauris tincidunt
        suscipit erat, id rutrum ipsum posuere nec. Pellentesque fringilla, eros interdum eleifend
        aliquet, lacus libero egestas lorem, in maximus mi tortor id augue. Vivamus rhoncus
        convallis ipsum, at varius nisl cursus a. Quisque hendrerit nisl quis sapien posuere, vel
        vulputate magna interdum. In dignissim, est condimentum consequat luctus, nisl leo ultricies
        risus, in consectetur lacus tellus quis augue. Vivamus euismod interdum turpis, a tempus
        erat tincidunt et. Phasellus luctus volutpat tempor. Integer nec bibendum lacus. Sed id
        ultricies risus. Proin porta luctus tellus nec porttitor. Curabitur massa magna, ornare in
        dui sit amet, lacinia faucibus diam. Nulla tempor accumsan velit vel viverra. Mauris sit
        amet nulla vel tortor mollis lacinia nec at diam. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vivamus orci mi, venenatis ac nisl vel, porta consequat augue. In quis
        nulla odio. Integer vel tristique nisl. Vivamus sed urna ligula. Nullam in orci lacus.
        Maecenas eget nulla ut ex gravida gravida id non odio. Curabitur lacus erat, egestas ac nisl
        ut, lacinia scelerisque massa. Nam viverra ligula nunc, vel venenatis eros hendrerit eget.
        Curabitur posuere semper sem ut tincidunt. Donec turpis velit, viverra sed tempor eu,
        dapibus non eros. Ut in finibus leo. Maecenas sit amet varius felis. Ut massa eros, porta in
        tempus et, porttitor a turpis. Aliquam erat volutpat. Etiam pellentesque sagittis massa, eu
        pellentesque ipsum. Aenean euismod tristique neque, vitae pharetra tortor vestibulum
        interdum. Phasellus id augue ante. Sed porta sit amet lacus sit amet laoreet. Fusce ut lorem
        dolor. Donec placerat orci nibh, vel tincidunt lacus lacinia quis. Nullam sem leo, interdum
        in justo ut, elementum sodales felis. In ac dolor sem. Cras eget erat tortor. Phasellus
        justo metus, mollis ut tincidunt gravida, sodales at nulla. Fusce in neque neque. Proin non
        pretium odio, id mattis lorem. Ut quis dolor purus. Orci varius natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Curabitur laoreet purus in fringilla luctus. Aenean sollicitudin ex nec
        facilisis molestie. Donec non nibh mattis, maximus eros in, cursus purus. Curabitur accumsan
        quam vitae sapien ultricies dapibus. In scelerisque gravida lectus, sed tristique leo tempor
        ut. Suspendisse molestie et metus vitae posuere. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia curae; Donec eget sapien diam. Proin tempor suscipit
        leo, vitae tempor velit posuere hendrerit. Nam a odio molestie lacus vehicula semper sit
        amet eget lacus. Pellentesque nisl purus, ultricies ac risus ut, facilisis sagittis purus.
        Mauris tincidunt suscipit erat, id rutrum ipsum posuere nec. Pellentesque fringilla, eros
        interdum eleifend aliquet, lacus libero egestas lorem, in maximus mi tortor id augue.
        Vivamus rhoncus convallis ipsum, at varius nisl cursus a. Quisque hendrerit nisl quis sapien
        posuere, vel vulputate magna interdum. In dignissim, est condimentum consequat luctus, nisl
        leo ultricies risus, in consectetur lacus tellus quis augue. Vivamus euismod interdum
        turpis, a tempus erat tincidunt et. Phasellus luctus volutpat tempor. Integer nec bibendum
        lacus. Sed id ultricies risus. Proin porta luctus tellus nec porttitor. Curabitur massa
        magna, ornare in dui sit amet, lacinia faucibus diam. Nulla tempor accumsan velit vel
        viverra. Mauris sit amet nulla vel tortor mollis lacinia nec at diam. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Vivamus orci mi, venenatis ac nisl vel, porta consequat
        augue. In quis nulla odio. Integer vel tristique nisl. Vivamus sed urna ligula. Nullam in
        orci lacus. Maecenas eget nulla ut ex gravida gravida id non odio. Curabitur lacus erat,
        egestas ac nisl ut, lacinia scelerisque massa. Nam viverra ligula nunc, vel venenatis eros
        hendrerit eget. Curabitur posuere semper sem ut tincidunt. Donec turpis velit, viverra sed
        tempor eu, dapibus non eros. Ut in finibus leo. Maecenas sit amet varius felis. Ut massa
        eros, porta in tempus et, porttitor a turpis. Aliquam erat volutpat. Etiam pellentesque
        sagittis massa, eu pellentesque ipsum. Aenean euismod tristique neque, vitae pharetra tortor
        vestibulum interdum. Phasellus id augue ante. Sed porta sit amet lacus sit amet laoreet.
        Fusce ut lorem dolor. Donec placerat orci nibh, vel tincidunt lacus lacinia quis. Nullam sem
        leo, interdum in justo ut, elementum sodales felis. In ac dolor sem. Cras eget erat tortor.
        Phasellus justo metus, mollis ut tincidunt gravida, sodales at nulla. Fusce in neque neque.
        Proin non pretium odio, id mattis lorem. Ut quis dolor purus. Orci varius natoque penatibus
        et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Curabitur laoreet purus in fringilla luctus. Aenean
        sollicitudin ex nec facilisis molestie. Donec non nibh mattis, maximus eros in, cursus
        purus. Curabitur accumsan quam vitae sapien ultricies dapibus. In scelerisque gravida
        lectus, sed tristique leo tempor ut. Suspendisse molestie et metus vitae posuere. Vestibulum
        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec eget
        sapien diam. Proin tempor suscipit leo, vitae tempor velit posuere hendrerit. Nam a odio
        molestie lacus vehicula semper sit amet eget lacus. Pellentesque nisl purus, ultricies ac
        risus ut, facilisis sagittis purus. Mauris tincidunt suscipit erat, id rutrum ipsum posuere
        nec. Pellentesque fringilla, eros interdum eleifend aliquet, lacus libero egestas lorem, in
        maximus mi tortor id augue. Vivamus rhoncus convallis ipsum, at varius nisl cursus a.
        Quisque hendrerit nisl quis sapien posuere, vel vulputate magna interdum. In dignissim, est
        condimentum consequat luctus, nisl leo ultricies risus, in consectetur lacus tellus quis
        augue. Vivamus euismod interdum turpis, a tempus erat tincidunt et. Phasellus luctus
        volutpat tempor. Integer nec bibendum lacus. Sed id ultricies risus. Proin porta luctus
        tellus nec porttitor. Curabitur massa magna, ornare in dui sit amet, lacinia faucibus diam.
        Nulla tempor accumsan velit vel viverra. Mauris sit amet nulla vel tortor mollis lacinia nec
        at diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus orci mi, venenatis
        ac nisl vel, porta consequat augue. In quis nulla odio. Integer vel tristique nisl. Vivamus
        sed urna ligula. Nullam in orci lacus. Maecenas eget nulla ut ex gravida gravida id non
        odio. Curabitur lacus erat, egestas ac nisl ut, lacinia scelerisque massa. Nam viverra
        ligula nunc, vel venenatis eros hendrerit eget. Curabitur posuere semper sem ut tincidunt.
        Donec turpis velit, viverra sed tempor eu, dapibus non eros. Ut in finibus leo. Maecenas sit
        amet varius felis. Ut massa eros, porta in tempus et, porttitor a turpis. Aliquam erat
        volutpat. Etiam pellentesque sagittis massa, eu pellentesque ipsum. Aenean euismod tristique
        neque, vitae pharetra tortor vestibulum interdum. Phasellus id augue ante. Sed porta sit
        amet lacus sit amet laoreet. Fusce ut lorem dolor. Donec placerat orci nibh, vel tincidunt
        lacus lacinia quis. Nullam sem leo, interdum in justo ut, elementum sodales felis. In ac
        dolor sem. Cras eget erat tortor. Phasellus justo metus, mollis ut tincidunt gravida,
        sodales at nulla. Fusce in neque neque. Proin non pretium odio, id mattis lorem. Ut quis
        dolor purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur laoreet
        purus in fringilla luctus. Aenean sollicitudin ex nec facilisis molestie. Donec non nibh
        mattis, maximus eros in, cursus purus. Curabitur accumsan quam vitae sapien ultricies
        dapibus. In scelerisque gravida lectus, sed tristique leo tempor ut. Suspendisse molestie et
        metus vitae posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia curae; Donec eget sapien diam. Proin tempor suscipit leo, vitae tempor velit
        posuere hendrerit. Nam a odio molestie lacus vehicula semper sit amet eget lacus.
        Pellentesque nisl purus, ultricies ac risus ut, facilisis sagittis purus. Mauris tincidunt
        suscipit erat, id rutrum ipsum posuere nec. Pellentesque fringilla, eros interdum eleifend
        aliquet, lacus libero egestas lorem, in maximus mi tortor id augue. Vivamus rhoncus
        convallis ipsum, at varius nisl cursus a. Quisque hendrerit nisl quis sapien posuere, vel
        vulputate magna interdum. In dignissim, est condimentum consequat luctus, nisl leo ultricies
        risus, in consectetur lacus tellus quis augue. Vivamus euismod interdum turpis, a tempus
        erat tincidunt et. Phasellus luctus volutpat tempor. Integer nec bibendum lacus. Sed id
        ultricies risus. Proin porta luctus tellus nec porttitor. Curabitur massa magna, ornare in
        dui sit amet, lacinia faucibus diam. Nulla tempor accumsan velit vel viverra. Mauris sit
        amet nulla vel tortor mollis lacinia nec at diam. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Vivamus orci mi, venenatis ac nisl vel, porta consequat augue. In quis
        nulla odio. Integer vel tristique nisl. Vivamus sed urna ligula. Nullam in orci lacus.
        Maecenas eget nulla ut ex gravida gravida id non odio. Curabitur lacus erat, egestas ac nisl
        ut, lacinia scelerisque massa. Nam viverra ligula nunc, vel venenatis eros hendrerit eget.
        Curabitur posuere semper sem ut tincidunt. Donec turpis velit, viverra sed tempor eu,
        dapibus non eros. Ut in finibus leo. Maecenas sit amet varius felis. Ut massa eros, porta in
        tempus et, porttitor a turpis. Aliquam erat volutpat. Etiam pellentesque sagittis massa, eu
        pellentesque ipsum. Aenean euismod tristique neque, vitae pharetra tortor vestibulum
        interdum. Phasellus id augue ante. Sed porta sit amet lacus sit amet laoreet. Fusce ut lorem
        dolor. Donec placerat orci nibh, vel tincidunt lacus lacinia quis. Nullam sem leo, interdum
        in justo ut, elementum sodales felis. In ac dolor sem. Cras eget erat tortor. Phasellus
        justo metus, mollis ut tincidunt gravida, sodales at nulla. Fusce in neque neque. Proin non
        pretium odio, id mattis lorem. Ut quis dolor purus. Orci varius natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Curabitur laoreet purus in fringilla luctus. Aenean sollicitudin ex nec
        facilisis molestie. Donec non nibh mattis, maximus eros in, cursus purus. Curabitur accumsan
        quam vitae sapien ultricies dapibus. In scelerisque gravida lectus, sed tristique leo tempor
        ut. Suspendisse molestie et metus vitae posuere. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia curae; Donec eget sapien diam. Proin tempor suscipit
        leo, vitae tempor velit posuere hendrerit. Nam a odio molestie lacus vehicula semper sit
        amet eget lacus. Pellentesque nisl purus, ultricies ac risus ut, facilisis sagittis purus.
        Mauris tincidunt suscipit erat, id rutrum ipsum posuere nec. Pellentesque fringilla, eros
        interdum eleifend aliquet, lacus libero egestas lorem, in maximus mi tortor id augue.
        Vivamus rhoncus convallis ipsum, at varius nisl cursus a. Quisque hendrerit nisl quis sapien
        posuere, vel vulputate magna interdum. In dignissim, est condimentum consequat luctus, nisl
        leo ultricies risus, in consectetur lacus tellus quis augue. Vivamus euismod interdum
        turpis, a tempus erat tincidunt et. Phasellus luctus volutpat tempor. Integer nec bibendum
        lacus. Sed id ultricies risus. Proin porta luctus tellus nec porttitor. Curabitur massa
        magna, ornare in dui sit amet, lacinia faucibus diam. Nulla tempor accumsan velit vel
        viverra. Mauris sit amet nulla vel tortor mollis lacinia nec at diam.
      </div>
    </GuestLayout>
  )
}

export default HomePage
