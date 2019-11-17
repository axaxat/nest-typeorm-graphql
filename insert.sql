INSERT INTO "public"."users"("id","name","surname","avatarUrl")
VALUES
(1,E'Alexander',E'Kalugin',E'avatar-url'),
(2,E'Vladimir',E'Ivanov',E'avatar-url'),
(3,E'Vitaliyi',E'Kuzmin',E'avatar-url'),
(4,E'Vasya',E'Pugovkin',E'avatar-url'),
(5,E'Starushka',E'Koritovna',E'avatar-url'),
(6,E'Baton',E'Hlebushkin',E'avatar-url'),
(7,E'Pupok',E'Bantikov',E'avatar-url');


INSERT INTO "public"."orgNodes"("id","parentId","title","userId","role")
VALUES
(1,NULL,E'Test Company',1,E'Boss'),
(2,1,E'Product Management',2,E'Chief'),
(3,1,E'Tehnology',3,E'CTO'),
(4,1,E'Administration',4,E'Chief'),
(5,2,E'Product',5,E'Product Owner'),
(6,3,E'Architecture',6,E'Chief Architect'),
(7,2,E'Testing',7,E'QA');
