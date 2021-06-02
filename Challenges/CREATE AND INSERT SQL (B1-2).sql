
CREATE DATABASE `collegeApp`;


# Dump of table users

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('mahasiswa','dosen') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `users` (`id`, `email`, `password`, `role`)
VALUES
	(1,'dosen@email.com','asd','dosen'),
	(2,'mahasiswa@email.com','mma','mahasiswa');



# Dump of table dosen

DROP TABLE IF EXISTS `dosen`;

CREATE TABLE `dosen` (
  `nidn` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  `userId` int(11) unsigned NOT NULL,
  PRIMARY KEY (`nidn`),
  KEY `userId` (`userId`),
  CONSTRAINT `dosen_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `dosen` (`nidn`, `nama`, `userId`)
VALUES
	(1,'dosen',1);



# Dump of table mahasiswa

DROP TABLE IF EXISTS `mahasiswa`;

CREATE TABLE `mahasiswa` (
  `nim` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) unsigned NOT NULL,
  `nama` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jurusan` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nim`),
  KEY `userId` (`userId`),
  CONSTRAINT `mahasiswa_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `mahasiswa` (`nim`, `userId`, `nama`, `alamat`, `tanggal_lahir`, `jurusan`)
VALUES
	(1,2,'mahasiswa','rumah','2000-12-01','ti');


# Dump of table mata_kuliah

DROP TABLE IF EXISTS `mata_kuliah`;

CREATE TABLE `mata_kuliah` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nama` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `mata_kuliah` (`id`, `nama`)
VALUES
	(1,'ipa'),
	(2,'ips');



DROP TABLE IF EXISTS `nilai`;

CREATE TABLE `nilai` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nim` int(11) unsigned DEFAULT NULL,
  `nidn` int(11) unsigned DEFAULT NULL,
  `id_matkul` int(11) unsigned DEFAULT NULL,
  `nilai` int(11) DEFAULT NULL,
  `keterangan` enum('lulus','belum lulus') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nim` (`nim`),
  KEY `nidn` (`nidn`),
  KEY `id_matkul` (`id_matkul`),
  CONSTRAINT `nilai_ibfk_1` FOREIGN KEY (`nim`) REFERENCES `mahasiswa` (`nim`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nilai_ibfk_2` FOREIGN KEY (`nidn`) REFERENCES `dosen` (`nidn`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `nilai_ibfk_3` FOREIGN KEY (`id_matkul`) REFERENCES `mata_kuliah` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `nilai` (`id`, `nim`, `nidn`, `id_matkul`, `nilai`, `keterangan`)
VALUES
	(1,1,1,1,100,'lulus'),
	(2,1,1,2,50,'belum lulus');

