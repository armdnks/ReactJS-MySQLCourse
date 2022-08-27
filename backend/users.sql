CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


INSERT INTO `users` (`id`, `name`, `email`, `gender`) VALUES
(1, 'John Doe', 'john@email.com', 'Male'),
(2, 'Jane Doe', 'jane@email.com', 'Female'),
(3, 'Ruthi Mottershead', 'rmottershead1@wufoo.com', 'Female'),
(4, 'Jermaine Woodall', 'lbartlosz4@over-blog.com', 'Male'),
(5, 'Patten Hansom', 'phansom7@sciencedaily.com', 'Male'),
(6, 'Hammad Impson', 'himpson3@sohu.com', 'Male'),
(7, 'Amber Onraet', 'aonraet5@a8.net', 'Female'),
(8, 'Margi Bridewell', 'mbridewell3@skype.com', 'Male'),
(9, 'Frederich Goult', 'fgoult8@cam.ac.uk', 'Male');

