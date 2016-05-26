--select name, numberofpersons, date, starttime, endtime, (select  count(*) from GymnastActivity where ActivityId = a.Id) functionaries  from Activities a
select * from gymnastactivity
insert into GymnastActivity (gymnastid, activityid) values(1,1)