Router.configure({
    layoutTemplate : 'layout',
    loadingTemplate : 'loading',
    waitOn : function (){
        Meteor.subscribe('posts');
    }
});

Router.route('/', {name: 'postsList'});
Router.route(
    '/posts/:_id', {
        name : 'postPage',
        data : function (){
            return Posts.findOne(this.params._id);
        }
    }
);