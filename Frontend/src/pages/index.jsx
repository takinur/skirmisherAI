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

        <div className="container mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:px-32">
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
                Most Demand Job Categories
              </h2>
              <span id="numberAnimate" className=" font-roboto text-base text-slate-300">
                10,000+ Jobs Posted
              </span>
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
              <h2 className="mt-1 font-roboto text-3xl text-indigo-300">Equitable Hiring</h2>
              <span id="numberAnimate" className=" font-roboto text-base text-slate-300">
                Enables recruiter to focus only on skills
              </span>
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
              <span id="numberAnimate" className=" font-roboto text-base text-slate-300">
                Easy to use and understand for both recruiters and job seekers
              </span>
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
                Quick setup & onboarding
              </h2>
              <span id="numberAnimate" className=" font-roboto text-base text-slate-300">
                Fast, tidy, adn efficient onboarding process
              </span>
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
              <h2 className="mt-1 font-roboto text-3xl text-indigo-300">Predictive Analytics</h2>
              <span id="numberAnimate" className=" font-roboto text-base text-slate-300">
                Get hiring process insights for data-driven decisions
              </span>
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
                Exceptional customer support
              </h2>
              <span id="numberAnimate" className=" font-roboto text-base text-slate-300">
                Our outstanding customer support team is always ready to help
              </span>
            </div>
          </div>
          <div className="mx-4 h-48 rounded-md bg-gray-700">W1</div>
          <div className="mx-4 h-48 rounded-md bg-gray-700">s</div>
          <div className="mx-4 h-48 rounded-md bg-gray-700">d</div>
          <div className="mx-4 h-48 rounded-md bg-gray-700">s</div>
          <div className="mx-4 h-48 rounded-md bg-gray-700">d</div>
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
