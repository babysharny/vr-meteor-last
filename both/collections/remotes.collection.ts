import {Mongo} from 'meteor/mongo';

export const Remotes = new Mongo.Collection('remotes');

if(Meteor.isClient){
   Meteor.subscribe('remotes', function(){
      console.log(Remotes, Remotes.find(), Remotes.find().fetch());
   });
}