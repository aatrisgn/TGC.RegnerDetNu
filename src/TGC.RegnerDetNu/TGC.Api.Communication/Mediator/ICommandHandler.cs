namespace TGC.WebApi.Communication.Mediator;

public interface ICommandHandler
{
	public Task<ICommandResponse> Handle<TCommand>(TCommand command) where TCommand : ICommand;
	public bool Accepts(ICommand command);
}