import React from 'react'
import GuestLayout from './Layout/Guest'

import ScrollToTop from '../components/ScrollToTop'
import { useTitle } from '../hooks/useTitle'

const HomePage = () => {
  useTitle('Welcome to Job Portal')

  return (
    <GuestLayout>
      <ScrollToTop />

      <div className="hero-section min:h-screen relative  bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-700 to-gray-900 py-28">
        <div className="container grid-cols-2 gap-4 md:grid">
          <div className=" main order-last grid grid-flow-row gap-2 pl-20 md:order-first">
            <h1 className="t mt-12 bg-gradient-to-bl from-blue-300 to-purple-700 bg-clip-text text-6xl font-bold text-transparent">
              SkirmisherAI
            </h1>
            <p className="mt-2 pr-4 text-2xl text-gray-300">
              It is a platform that helps employers to find the right talent for their organization
              and helps job seekers to find the right job for them.
            </p>
          </div>
          <div className="image-section">
            <div className="image-container relative flex h-full w-full justify-center ">
              <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-y-1/2 -translate-x-1/2  bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-400 to-indigo-600 blur-3xl "></div>
              <img
                className="w-max-[320px] z-10  w-[320px] "
                src="https://vitejs.dev/logo-with-shadow.png"
                alt="Vite Logo"
              />
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
