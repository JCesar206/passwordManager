import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa6';

export default function Footer() {
  return(
		<footer className='bg-gray-900 text-white py-4 mt-8 w-full fixed bottom-0 left-0 z-10'>
			<div className='flex flex-col items-center justify-center'>
				<div className='flex space-x-6 text-xl mb-2'>
					<a href='https://github.com/JCesar206' target='_blank' rel='noopener noferrer'>
						<FaGithub className='hover:text-green-400' />
					</a>
					<a href='https://www.linkedin.com/in/jcesar206' target='_blank' rel='noopener noreferrer'>
						<FaLinkedin className='hover:text-yellow-400' />
					</a>
					<a href='mailto:jcesar206@hotmail.com'>
						<FaEnvelope className='hover:text-red-400' />
					</a>
				</div>
			</div>
			<p className='text-white font-semibold text-center text-xs'>&copy; Password Manager V 1.0 {new Date().getFullYear()} JulyDevops. Todos los derechos reservados.</p>
		</footer>
	);
}